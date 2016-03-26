var sw = sw || {};

(function(sw, $) {
  
  //TODO set min/max font sizes via media queries
  const MIN_FONT_SIZE = 50;
  const MAX_FONT_SIZE = 150;
  
  const FONTS = [
    'Arial,"Helvetica Neue",Helvetica,sans-serif', 
    '"Arial Black","Arial Bold",Gadget,sans-serif', 
    '"Arial Rounded MT Bold","Helvetica Rounded",Arial,sans-serif', 
    'Calibri,Candara,Segoe,"Segoe UI",Optima,Arial,sans-serif', 
    '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Verdana,sans-serif', 
    
    '"Book Antiqua",Palatino,"Palatino Linotype","Palatino LT STD",Georgia,serif', 
    'Cambria,Georgia,serif', 
    '"Lucida Bright",Georgia,serif', 
    'Rockwell,"Courier Bold",Courier,Georgia,Times,"Times New Roman",serif', 
    'TimesNewRoman,"Times New Roman",Times,Baskerville,Georgia,serif', 
    
    '"Lucida Console","Lucida Sans Typewriter",monaco,"Bitstream Vera Sans Mono",monospace', 
    'Papyrus,fantasy'
  ];
  
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
      $sightWordContainer.css('font-family', sw.getRandItem(FONTS));
      $sightWordContainer.css('font-size', sw.getRand(MIN_FONT_SIZE, MAX_FONT_SIZE));
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
