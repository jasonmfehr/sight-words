var sw = sw || {};

(function($){
    const $loadModal = $('#loadingModal');

    $(document).on('state-continue_saved_game', function(event){
        $loadModal.modal('show');

        sw.ajax.get('/games/' + event.gameId + '/words', function(data){
            
            $loadModal.modal('hide');
        });
    });
})(jQuery);
