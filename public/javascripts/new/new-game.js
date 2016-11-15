var sw = sw || {};

(function($){
    const
        $loadModal = $('#loadingModal'),
        $newGameLevelSlider = $('#sliderGameLevel'),
        $spnMinLevel = $('#spnMinLevel'),
        $spnMaxLevel = $('#spnMaxLevel');

    var minLevel,
        maxLevel;

    $(document).on('state-configure_new_game', function(event){
        $newGameLevelSlider.on('slide', function(event){
            _refreshSlider(event.value);
        });

        $loadModal.modal('show');
        sw.ajax.get('/games/levels', function(data){
            $newGameLevelSlider.slider({ id: "slider12c", min: data.min, max: data.max, range: true, value: [data.min, data.max] });
            _refreshSlider([data.min, data.max]);
            $loadModal.modal('hide');
            $('#newGameModal').modal('show');
        });
    });

    $('#btnConfigureNewGame').click(function(event){
        sw.stateManager.startNewGame(minLevel, maxLevel);
    });

    function _refreshSlider(arrVal) {
        minLevel = arrVal[0];
        maxLevel = arrVal[1];
        $spnMinLevel.text(minLevel);
        $spnMaxLevel.text(maxLevel);
    }

    $(document).on('state-start_new_game', function(event){
        $loadModal.modal('show');
        sw.ajax.post('/users/' + sw.stateManager.userId + '/games', {"minLevel": event.minLevel, "maxLevel": event.maxLevel}, function(data){
            sw.stateManager.words = data.words;
            sw.stateManager.gameId = data.id;
            $loadModal.modal('hide');
            //TODO start here with throwing a next word event
        });
    });
})(jQuery);
