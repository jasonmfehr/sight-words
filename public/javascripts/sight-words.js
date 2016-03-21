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
    sw.wordSuccess($('#sightWord').text());
    generate();
  });
  
  $('#btnTryAgain').click(function() {
    sw.wordFail($('#sightWord').text());
    generate();
  });
  
  function generate() {
    var $sightWordContainer = $('#sightWord');
    
    if(updateProgressBar()){
      $('#btnOk').attr('disabled', true);
      $('#btnTryAgain').attr('disabled', true);
      showReport();
    }else{
      $sightWordContainer.css('font-family', sw.getRandItem(FONTS));
      $sightWordContainer.css('font-size', sw.getRand(MIN_FONT_SIZE, MAX_FONT_SIZE));
      $sightWordContainer.text(sw.getRandSightWord());
    }
    
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
  
  function showReport() {
    var $tbody = $('#statusReport > tbody');
    
    $tbody.children().remove();
    
    for(item of sw.statusReport()){
      $tbody.append('              <tr><td>' + item.level + '</td><td>' + item.word + '</td><td>' + item.attempts + '</td></tr>');
    }
    
    $('#mainContainer').hide();
    $('#reportContainer').show();
    setTimeout(function() {
      $('#successAlert').slideUp(2000)
    },5000);
  }
  
  $(document).ready(function() {
    generate();
  });
  
})(sw, jQuery);
