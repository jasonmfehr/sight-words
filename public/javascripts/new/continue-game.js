var sw = sw || {};

(function($){
    const $loadModal = $('#loadingModal');

    $(document).on('state-continue_saved_game', function(event){
        $loadModal.modal('show');

        sw.ajax.get('/games/' + sw.stateManager.gameId + '/words', function(data){
            sw.wordManager.words = data.words;
            sw.wordManager.refreshStats();
            sw.stateManager.wordCountChanged();
            $loadModal.modal('hide');
            sw.stateManager.nextWord();
            sw.ui.enableButtonsWithDelay(false);
        });
    });
})(jQuery);
