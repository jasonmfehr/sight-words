var sw = sw || {};
sw.ui = sw.ui || {};

(function(ui, $){

    const $pb = $('#completedProgress');

    $('#btnOk').click(function() {
        ui.disableButtons();
        sw.stateManager.wordSuccess();
        ui.enableButtonsWithDelay();
    });

    $('#btnTryAgain').click(function() {
        ui.disableButtons();
        sw.stateManager.wordFail();
        ui.enableButtonsWithDelay();
    });

    $('#btnGoBack').click(function() {
        ui.disableButtons();
        sw.stateManager.goBack();
        ui.enableButtonsWithDelay(false);
    });

    //setup the progress bar
    $(document).on('state-word_count_changed', function(event){
        $pb.attr('aria-valuemax', sw.wordManager.words.length);
        $pb.attr('aria-valuenow', 0);
        $pb.css('width', 0 / sw.wordManager.words.length * 100 + '%');
    });

    //increment the progress bar
    $(document).on('state-next_word', function(event){
        $pb.attr('aria-valuenow', $pb.attr('aria-valuenow') + 1);
    });

    //decrement the progress bar
    $(document).on('state-go_back', function(event){
        $pb.attr('aria-valuenow', $pb.attr('aria-valuenow') - 1);
    });

    ui.disableButtons = function() {
      $('#btnOk').attr('disabled', true);
      $('#btnTryAgain').attr('disabled', true);
      $('#btnGoBack').attr('disabled', true);
    }

    ui.enableButtons = function(enableGoBack) {
      $('#btnOk').removeAttr('disabled');
      $('#btnTryAgain').removeAttr('disabled');
      if(enableGoBack !== false){
        $('#btnGoBack').removeAttr('disabled');
      }
    }

    ui.enableButtonsWithDelay = function(enableGoBack) {
      setTimeout(enableButtons, 250, enableGoBack);
    }
})(sw.ui, jQuery);
