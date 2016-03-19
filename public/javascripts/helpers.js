var sw = sw || {};

(function(sw, $) {
  
  sw.getRand = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  sw.getRandItem = (arr) => {
    return arr[sw.getRand(0, arr.length)];
  }
  
})(sw, jQuery);
