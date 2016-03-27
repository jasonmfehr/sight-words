var sw = sw || {};

(function(sw, $) {
  
  const FONT_SIZE_CLASS_PREFIX = 'fs', FONT_SIZE_COUNT = 10, FONT_CLASS_PREFIX = 'font', FONT_COUNT = 12;
  var ALL_FONT_CLASSES, ALL_FONT_SIZE_CLASSES;

  //setup strings holding all available font classes and font size classes
  ALL_FONT_SIZE_CLASSES = '';
  for(var i=0; i<FONT_SIZE_COUNT; i++){
    ALL_FONT_SIZE_CLASSES += ' ' + FONT_SIZE_CLASS_PREFIX + i;
  }
  
  ALL_FONT_CLASSES = '';
  for(var i=0; i<FONT_COUNT; i++){
    ALL_FONT_CLASSES += ' ' + FONT_CLASS_PREFIX + i;
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
  
  $('#startOver').click(function() {
    window.location.reload();
  });
  
  $('#mainNav').click(function() {
    sw.timer.pause();
  });
  
  $(document).ready(function() {
    $('#pauseModal').modal();
  });
  
  
  function generate() {
    var $sightWordContainer = $('#sightWord');
    
    if(updateProgressBar()){
      disableButtons();
      showReport();
    }else{
      //$sightWordContainer.css('font-family', sw.getRandItem(FONTS));
      $sightWordContainer.removeClass(ALL_FONT_CLASSES).addClass(FONT_CLASS_PREFIX + sw.getRand(0, FONT_COUNT - 1));
      $sightWordContainer.removeClass(ALL_FONT_SIZE_CLASSES).addClass(FONT_SIZE_CLASS_PREFIX + sw.getRand(0, FONT_SIZE_COUNT - 1));
      $sightWordContainer.text(sw.getRandSightWord());
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
  }
  
  function enableButtons() {
    $('#btnOk').removeAttr('disabled');
    $('#btnTryAgain').removeAttr('disabled');
  }
  
  function enableButtonsWithDelay() {
    setTimeout(enableButtons, 250);
  }
  
})(sw, jQuery);
