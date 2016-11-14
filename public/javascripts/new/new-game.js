var sw = sw || {};

(function($){
    const
        $loadModal = $('#loadingModal'),
        $newGameLevelSlider = $('#sliderGameLevel'),
        $spnMinLevel = $('#spnMinLevel'),
        $spnMaxLevel = $('#spnMaxLevel');

    var userId,
        minLevel,
        maxLevel;

    $(document).on('state-configure_new_game', function(event){
        userId = event.userId;

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
        sw.stateManager.startNewGame(userId, minLevel, maxLevel);
    });

    function _refreshSlider(arrVal) {
        minLevel = arrVal[0];
        maxLevel = arrVal[1];
        $spnMinLevel.text(minLevel);
        $spnMaxLevel.text(maxLevel);
    }

    $(document).on('state-start_new_game', function(event){
        $loadModal.modal('show');
        sw.ajax.post('/users/' + event.userId + '/games', {"minLevel": event.minLevel, "maxLevel": event.maxLevel}, function(data){
            //TODO - start here, words are in data.words
            console.log("got here")
            $loadModal.modal('hide');
        });
    });
})(jQuery);
