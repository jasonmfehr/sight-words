var sw = sw || {};
sw.timer = sw.timer || {};

(function(timer, $) {

  var timeTracker = new Array();
  
  timer.start = function() {
    timeTracker = new Array();
    timeTrackerTick();
  }
  
  timer.pause = function() {
    timeTracker.push(Date.now());
  }
  
  timer.getTime = function() {
    var points = 0, totalTime = 0, ticked = false;
    
    if(timeTracker.length % 2 != 0){
      ticked = true;
      timeTrackerTick();
    }
    
    for(var i=0; i<timeTracker.length; i+=2) {
      totalTime += (timeTracker[i+1] - timeTracker[i]);
    }
    
    if(ticked === true){
      timeTracker.pop();
    }
    
    return totalTime;
  }
  
  function timeTrackerTick() {
    timeTracker.push(Date.now());
  }
  
})(sw.timer, jQuery);
