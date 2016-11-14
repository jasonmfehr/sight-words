var sw = sw || {};

(function($){
    $(document).on('state-user_select', function(event){
        const $loadModal = $('#loadingModal');
        $loadModal.modal('show');

        getAvailableUsers(function(data){
            const $userSelect = $('#userSelect');

            $userSelect.empty();
            $userSelect.append('<option></option>');

            //prep user modal
            data.forEach(function(user){
                $userSelect.append('<option value="' + user.id + '" data-hasInProgressGame="' + user.hasInProgressGame + '">' + user.user_name + '</option>');
            });
            //hide load modal
            $loadModal.modal('hide');

            //show user select modal
            $('#userSelectModal').modal('show');
        });
    });

    $('#userSelectModalButton').click(function(event){
        $('#userSelectModal').modal('hide');
        sw.stateManager.initializing($('#userSelect').val());
    });

    $('#userSelect').change(function(event){
        if($(this).val() === ""){
            $('#userSelectModalButton').prop('disabled', true);
        }else{
            $('#userSelectModalButton').prop('disabled', false);
        }
    });

    function getAvailableUsers(callback) {
        //TODO handle issues if ajax call fails
        sw.ajax.get('/users?includeInProgress=true', callback);
    }
})(jQuery);
