//KEEP
var sw = sw || {};

(function(sw, $) {

  sw.getRand = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  sw.getRandItem = function(arr) {
    return arr[sw.getRand(0, arr.length)];
  }

})(sw, jQuery);
