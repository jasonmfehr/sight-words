var sw = sw || {};

(function(sw, $) {

  const
    FONT_SIZE_CLASS_PREFIX = 'fs', FONT_SIZE_COUNT = 10,
    FONT_CLASS_PREFIX = 'font', FONT_COUNT = 12,
    FONT_COLOR_CLASS_PREFIX = 'fc', FONT_COLOR_COUNT = 12;

  var ALL_FONT_CLASSES, ALL_FONT_SIZE_CLASSES, ALL_FONT_COLOR_CLASSES;

  //setup strings holding all available font classes and font size classes
  ALL_FONT_SIZE_CLASSES = '';
  for(var i=0; i<FONT_SIZE_COUNT; i++){
    ALL_FONT_SIZE_CLASSES += ' ' + FONT_SIZE_CLASS_PREFIX + i;
  }

  ALL_FONT_CLASSES = '';
  for(var i=0; i<FONT_COUNT; i++){
    ALL_FONT_CLASSES += ' ' + FONT_CLASS_PREFIX + i;
  }

  ALL_FONT_COLOR_CLASSES = '';
  for(var i=0; i<FONT_COLOR_COUNT; i++){
    ALL_FONT_COLOR_CLASSES += ' ' + FONT_COLOR_CLASS_PREFIX + i;
  }

  $('#btnOk').click(function() {
    disableButtons();
    sw.wordSuccess($('#sightWord').text());
    generate();
    enableButtonsWithDelay();
  });

  $('#btnTryAgain').click(function() {
    disableButtons();
    sw.wordFail($('#sightWord').text());
    generate();
    enableButtonsWithDelay();
  });

  $('#btnGoBack').click(function() {
    disableButtons();
    generate(sw.goBack());
    enableButtonsWithDelay(false);
  });

  $('#startOver').click(function() {
    window.location.reload();
  });

  $('#mainNav').click(function() {
    sw.timer.pause();
  });

    $(document).ready(function() {
        sw.stateManager.userSelect();
        /*
        const $loadModal = $('#loadingModal');
        var loaded = false;

        disableButtons();

        $("#ex2").slider({ id: "slider12c", min: 0, max: 10, range: true, value: [3, 7] });

        setTimeout(function() {
            if(loaded === false){
                $loadModal.modal('show');
            }
        }, 250);


        sw.newGame(function(success){
            //TODO handle success === false
            loaded = true;
            if(success === true){
                generate();
                $loadModal.modal('hide');
                enableButtonsWithDelay();
            }
        });
        */
    });


  function generate(word) {
    var $sightWordContainer = $('#sightWord');

    if(updateProgressBar()){
      disableButtons();
      showReport();
    }else{
      $sightWordContainer.removeClass(ALL_FONT_CLASSES).addClass(FONT_CLASS_PREFIX + sw.getRand(0, FONT_COUNT - 1));
      $sightWordContainer.removeClass(ALL_FONT_SIZE_CLASSES).addClass(FONT_SIZE_CLASS_PREFIX + sw.getRand(0, FONT_SIZE_COUNT - 1));
      $sightWordContainer.removeClass(ALL_FONT_COLOR_CLASSES).addClass(FONT_COLOR_CLASS_PREFIX + sw.getRand(0, FONT_COLOR_COUNT - 1));

      if(!word){
        word = sw.getRandSightWord();

      }
      $sightWordContainer.text(word);
    }

    sw.timer.start();
  }

  function updateProgressBar() {
    var $pb = $('#completedProgress'),
        wordCount = sw.countTotalWords(),
        completedWords = wordCount - sw.countWordLeft();

    $pb.attr('aria-valuemax', wordCount);
    $pb.attr('aria-valuenow', completedWords);
    $pb.css('width', completedWords / wordCount * 100 + '%');

    return wordCount === completedWords;
  }

  $(document).on('show.bs.modal', function(e) {
    if(e.target.id === 'reportModal'){
      generateReport($('#statusReportModal > tbody'), true);
    }else if(e.target.id === 'pauseModal' && e.relatedTarget){
      var $button = $(e.relatedTarget);

      sw.timer.pause();

      $('#pauseModalLabel').text($button.data('text'));
      $('#pauseModalButton').text($button.data('button'));
      $('#pauseModal').data('mode', $button.data('modal-mode'));
    }
  });

  $(document).on('hidden.bs.modal', function(e) {
    if(e.target.id === 'pauseModal' && $(e.target).data('mode') === 'start'){
        generate();
    }else{
        sw.timer.pause();
     }
  });

  $('#navbar').on('hidden.bs.dropdown', function() {
    sw.timer.pause();
  });

  function showReport() {
    generateReport($('#statusReport > tbody'));
    $('#mainContainer').hide();
    $('#reportContainer').show();
    setTimeout(function() {
      $('#successAlert').slideUp(2000)
    },5000);
  }

  function generateReport($tbody, showStatus) {
    $tbody.children().remove();

    for(item of sw.statusReport()){
      var status = '';
      if(showStatus){
        status = '<td>' + item.status + '</td>';
      }
      $tbody.append('              <tr><td>' + item.level + '</td><td>' + item.word + '</td><td>' + item.attempts + '</td><td>' + item.time + '</td>' + status + '</tr>');
    }
  }

  function disableButtons() {
    $('#btnOk').attr('disabled', true);
    $('#btnTryAgain').attr('disabled', true);
    $('#btnGoBack').attr('disabled', true);
  }

  function enableButtons(enableGoBack) {
    $('#btnOk').removeAttr('disabled');
    $('#btnTryAgain').removeAttr('disabled');
    if(enableGoBack !== false){
      $('#btnGoBack').removeAttr('disabled');
    }
  }

  function enableButtonsWithDelay(enableGoBack) {
    setTimeout(enableButtons, 250, enableGoBack);
  }

})(sw, jQuery);
