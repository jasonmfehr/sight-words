var sw = sw || {};

(function(sw, $) {
  
  //word status
  const NOT_SHOWN = 0;
  const SUCCESS = 1;
  const TRY_AGAIN = 2;
  
  //TODO externalize this in a database or something
  const SIGHT_WORDS = [
    /*
    { 'word': 'here', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'a', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'is', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'see', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'go', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'to', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'I', 'doTransform': false, 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'and', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'my', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'like', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 0, 'time': 0 }, 
    { 'word': 'pink', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'blue', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'green', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'white', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'purple', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'black', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'orange', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'yellow', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'red', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'brown', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 1, 'time': 0 }, 
    { 'word': 'said', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'funny', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'have', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'are', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'she', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'the', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'for', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'play', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'he', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'it', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 2, 'time': 0 }, 
    { 'word': 'away', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'big', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'can', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'run', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'come', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'me', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'down', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'help', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'in', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'find', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'one', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'not', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'you', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'we', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'up', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'three', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'two', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'make', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'jump', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 3, 'time': 0 }, 
    { 'word': 'this', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'but', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'do', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'where', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'they', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'on', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'little', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'at', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'then', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    { 'word': 'out', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 4, 'time': 0 }, 
    */
    { 'word': 'all', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'there', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'went', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'of', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'that', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'was', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'will', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'when', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'what', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0 }, 
    { 'word': 'with', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 5, 'time': 0  },
    /*
    { 'word': 'now', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'some', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'get', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'be', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'into', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'day', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'eat', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'his', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'so', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  },
    { 'word': 'too', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 6, 'time': 0  }
    */
    { 'word': 'if', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'am', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'or', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'how', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'going', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'dad', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'their', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'home', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'got', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'put', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'no', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'water', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'just', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'time', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'your', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'which', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'did', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'very', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'has', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'good', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'dog', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'her', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'back', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'long', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'house', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'were', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'saw', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'as', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'by', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'them', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'over', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'came', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'from', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'an', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'tree', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'mom', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'had', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  },
    { 'word': 'cat', 'status': NOT_SHOWN, 'attempts': 0, 'grade': 'K', 'level': 7, 'time': 0  }
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
  
  var prev,curOrig;
  
  //TODO this function is extremely dangerous as it blindly recurses assuming the state of the SIGHT_WORDS array is being properly managed
  //returns a random sight word that is NOT_SHOWN or TRY_AGAIN and is within the skill level of the user
  sw.getRandSightWord = function() {
    var wordObj, transformFunc;
    
    if(curOrig){
      prev = curOrig;
    }
    
    wordObj = sw.getRandItem(SIGHT_WORDS);
    
    if(wordObj.status === SUCCESS || wordObj.level > sw.user.level){
      return sw.getRandSightWord();
    }else{
      curOrig = {"word": wordObj.word, "status": wordObj.status, "time": wordObj.time, "attempts": wordObj.attempts, "doTransform": wordObj.doTransform};
      
      return transformWord(wordObj);
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
  
  //goes back to the previous word, cannot go back more than once
  sw.goBack = function() {
    if(prev){
      var tmpPrev = prev;
      SIGHT_WORDS
        .filter(function(item){
          return item.word.toLowerCase() === prev.word.toLowerCase();
        })
        .forEach(function(item){
          item.status = prev.status;
          item.time = prev.time;
          item.attempts = prev.attempts;
        });

      curOrig = prev;
      prev = null;
      
      return transformWord(tmpPrev);
    }else{
      throw new Error("no previous word available");
    }
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
  
  //performs a random transform on a word unless doTransform on that word has been set to false
  function transformWord(wordObj) {
    if(wordObj.doTransform === false){
        return wordObj.word;
      }else{
        transformFunc = sw.getRandItem(TRANSFORM_FUNCS);
        return transformFunc(wordObj.word);
      }
  }
  
})(sw, jQuery);
