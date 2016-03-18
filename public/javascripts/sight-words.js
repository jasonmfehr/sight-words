(function($) {
  
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
  
  $("#btnOk").click(function() {
    generate();
  });
  
  function generate() {
    $("#sightWord").css("font-family", FONTS[getRand(0, FONTS.length)]);
    $("#sightWord").css("font-size", getRand(50, 200));
  }
  
  function getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
})(jQuery);
