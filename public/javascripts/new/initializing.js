var sw = sw || {};

(function($){
    const $loadModal = $('#loadingModal');

    var userId,
        inProgressGameId;

    $(document).on('state-initializing', function(event){
        $loadModal.modal('show');

        sw.ajax.get('/users/' + event.userId + '/games?inprogress=true&limit=1', function(data){
            if(data.length === 0){
                sw.stateManager.configureNewGame(event.userId);
            }else{
                userId = event.userId;
                inProgressGameId = data[0].id;
                $('#continueGameModal').modal('show');
            }

            $loadModal.modal('hide');
        });
    });

    $('#btnContinueGame').click(function(event){
        $('#continueGameModal').modal('hide');
        sw.stateManager.continueSavedGame(userId, inProgressGameId);
    });

    $('#btnNewGame').click(function(event){
        $('#continueGameModal').modal('hide');
        sw.stateManager.configureNewGame(userId);
    });
})(jQuery);
