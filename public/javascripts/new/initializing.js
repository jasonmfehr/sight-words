var sw = sw || {};

(function($){
    const $loadModal = $('#loadingModal');

    $(document).on('state-initializing', function(event){
        $loadModal.modal('show');

        sw.ajax.get('/users/' + sw.stateManager.userId + '/games?inprogress=true&limit=1', function(data){
            if(data.length === 0){
                sw.stateManager.configureNewGame();
            }else{
                sw.stateManager.gameId = data[0].id;
                $('#continueGameModal').modal('show');
            }

            $loadModal.modal('hide');
        });
    });

    $('#btnContinueGame').click(function(event){
        $('#continueGameModal').modal('hide');
        sw.stateManager.continueSavedGame();
    });

    $('#btnNewGame').click(function(event){
        $('#continueGameModal').modal('hide');
        sw.stateManager.configureNewGame();
    });
})(jQuery);
