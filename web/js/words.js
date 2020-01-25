var sw = sw || {};

(function(sw, $) {

  //word status
  const NOT_SHOWN = 0;
  const SUCCESS = 1;
  const TRY_AGAIN = 2;

  const TRANSFORM_FUNCS = [
      function(str) {
        return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
      },
      function(str) {
        return str.toUpperCase();
      },
      function(str) {
        return str.toLowerCase();
      }
  ]

  var prev,curOrig,sightWords;

  //TODO this function is extremely dangerous as it blindly recurses assuming the state of the sightWords array is being properly managed
  //returns a random sight word that is NOT_SHOWN or TRY_AGAIN and is within the skill level of the user
  sw.getRandSightWord = function() {
    var wordObj, transformFunc;

    if(curOrig){
      prev = curOrig;
    }

    wordObj = sw.getRandItem(sightWords);

    if(wordObj.status === SUCCESS){
      return sw.getRandSightWord();
    }else{
      curOrig = {"word": wordObj.word, "status": wordObj.status, "time": wordObj.time, "attempts": wordObj.attempts, "dotransform": wordObj.dotransform};

      return transformWord(wordObj);
    }
  }

  //counts the NOT_SHOWN and TRY_AGAIN words within the skill level of the user
  sw.countWordLeft = function() {
    var wordsLeft = 0;

    for(w of sightWords){
      if((w.status === NOT_SHOWN || w.status === TRY_AGAIN)){
        wordsLeft++;
      }
    }

    return wordsLeft;
  }

  //counts the number of words within the current user's skill level
  sw.countTotalWords = function() {
    return sightWords.length;

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

    for(w of sightWords){
        report.push({ 'word': w.word.toUpperCase(), 'status': descriptiveStatus(w.status), 'attempts': w.attempts, 'level': w.level, 'time': w.time });
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
      sightWords
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

  //retrieves the sight words list from the server
  //the function provided as a callback will be passed a boolean indicating success (true) or failure (false)
  sw.newGame = function(callback) {
      sw.ajax.get('words?grade=0&minLevel=0&maxLevel=6', function(data) {
          if(data){
              sightWords=data;
              sightWords.forEach(function(item){
                 item.status = NOT_SHOWN;
                 item.attempts = 0;
                 item.time = 0;
              });
              callback(true);
          }else{
              callback(false);
          }
      });
  }

  //loads an existing game with the provided data
  sw.load = function(personId) {
    sw.ajax.get('person/' + personId + '/games?status=inProgress', function(data) {
      if(data.length > 0){
        sightWords = data;
      }
    });
  }

  //saves the existing game
  sw.add = function(personId, callback) {
    sw.ajax.post('person/' + personId + '/games', sightWords, function(newGameId) {
      console.log("new game id: " + newGameId.gameId);
    })
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

    for(w of sightWords){
      if(w.word.toLowerCase() === lcaseWordStr){
        w.status = status;
        w.attempts++;
        w.time += sw.timer.getTime();
        break;
      }
    }
  }

  //performs a random transform on a word unless dotransform on that word has been set to false
  function transformWord(wordObj) {
    if(wordObj.dotransform === false){
        return wordObj.word;
      }else{
        transformFunc = sw.getRandItem(TRANSFORM_FUNCS);
        return transformFunc(wordObj.word);
      }
  }

})(sw, jQuery);
