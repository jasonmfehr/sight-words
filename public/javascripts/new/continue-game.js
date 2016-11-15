var sw = sw || {};

(function($){
    const $loadModal = $('#loadingModal');

    $(document).on('state-continue_saved_game', function(event){
        $loadModal.modal('show');

        sw.ajax.get('/games/' + sw.stateManager.gameId + '/words', function(data){
            sw.stateManager.words = data.words;
            $loadModal.modal('hide');
            //TODO start here with throwing a next word event
        });
    });
})(jQuery);
