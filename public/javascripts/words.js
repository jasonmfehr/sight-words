var sw = sw || {};

(function(sw, $) {
  
  //word status
  const NOT_SHOWN = 0;
  const SUCCESS = 1;
  const TRY_AGAIN = 2;
  
  //TODO externalize this in a database or something
  const SIGHT_WORDS = [
    { 'word': 'here', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'a', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'is', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'see', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'go', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'to', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'I', 'transform': false, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'and', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'my', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'like', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'pink', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'blue', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'green', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'white', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'purple', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'black', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'orange', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'yellow', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'red', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'brown', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'said', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'funny', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'have', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'are', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'she', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'the', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'for', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'play', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'he', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'it', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'away', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'big', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'can', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'run', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'come', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'me', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'down', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'help', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'in', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'find', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'one', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'not', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'you', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'we', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'up', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'three', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'two', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'make', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'jump', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'this', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'but', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'do', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'where', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'they', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'on', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'little', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'at', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'then', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'out', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'all', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'there', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'went', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'of', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'that', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'was', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'will', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'when', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'what', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'with', 'transform': true, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0  }
  ];
  
  const UCASE_FIRST = function(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  const UCASE_ALL = function(str) {
    return str.toUpperCase();
  }
  
  const LCASE_ALL = function(str) {
    return str.toLowerCase();
  }
  
  const TRANSFORM_FUNCS = [
    UCASE_FIRST, 
    UCASE_ALL, 
    LCASE_ALL
  ]
  
  //TODO this function is extremely dangerous as it blindly recurses assuming the state of the SIGHT_WORDS array is being properly managed
  //returns a random sight word that is NOT_SHOWN or TRY_AGAIN and is within the skill level of the user
  sw.getRandSightWord = function() {
    var wordObj, transformFunc;
    
    wordObj = sw.getRandItem(SIGHT_WORDS);
    
    if(wordObj.status === SUCCESS || wordObj.level > sw.user.level){
      return sw.getRandSightWord();
    }else{
      if(wordObj.transform === true){
        transformFunc = sw.getRandItem(TRANSFORM_FUNCS);
        return transformFunc(wordObj.word);
      }else{
        return wordObj.word;
      }
    }
  }
  
  //counts the NOT_SHOWN and TRY_AGAIN words within the skill level of the user
  sw.countWordLeft = function() {
    var wordsLeft = 0;
    
    for(w of SIGHT_WORDS){
      if((w.status === NOT_SHOWN || w.status === TRY_AGAIN) && w.level <= sw.user.level){
        wordsLeft++;
      }
    }
    
    return wordsLeft;
  }
  
  //counts the number of words within the current user's skill level
  sw.countTotalWords = function() {
    var wordCount = 0;
    
    for(w of SIGHT_WORDS){
      if(w.level <= sw.user.level){
        wordCount++;
      }
    }
    
    return wordCount;
    
  }
  
  //sets the status of a word to SUCCESS
  sw.wordSuccess = function(wordStr) {
    updateWord(wordStr, SUCCESS);
  }
  
  //sets the status of a word to TRY_AGAIN
  sw.wordFail = function(wordStr) {
    updateWord(wordStr, TRY_AGAIN);
  }
  
  //builds an object listing the status of each word and how many attempts it took to get there
  sw.statusReport = function() {
    var report = [];
    
    for(w of SIGHT_WORDS){
      if(w.level <= sw.user.level){
        report.push({ 'word': w.word.toUpperCase(), 'status': descriptiveStatus(w.status), 'attempts': w.attempts, 'level': w.level, 'time': w.time });
      }
    }
    
    //TODO sort by level then alphabetically
    return report.sort(function(first,second) {
      if(first.level < second.level){
        return -1;
      }else if(first.level > second.level){
        return 1;
      }else{
        return first.word.localeCompare(second.word);
      }
    });
  }
  
  //converts a status number into a human readable string
  function descriptiveStatus(status) {
    if(status === NOT_SHOWN){
      return "not shown";
    }else if(status === TRY_AGAIN){
      return "still trying";
    }else{
      return "success";
    }
  }
  
  //does the actual work of updating the status and attempt count of a word
  function updateWord(wordStr, status) {
    var lcaseWordStr;
    
    lcaseWordStr = wordStr.toLowerCase();
    
    for(w of SIGHT_WORDS){
      if(w.word.toLowerCase() === lcaseWordStr){
        w.status = status;
        w.attempts++;
        w.time += sw.timer.getTime();
        break;
      }
    }
  }
  
})(sw, jQuery);
