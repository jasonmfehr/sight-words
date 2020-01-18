var sw = sw || {};
sw.wordManager = sw.wordManager || {};

(function(wordMgr, $){

    var completedWords = 0,
        curWordIndex = -1,
        prevWordIndex;

    const
        $sightWordContainer = $('#sightWord'),
        FONT_SIZE_CLASS_PREFIX = 'fs',
        FONT_SIZE_COUNT = 10,
        FONT_CLASS_PREFIX = 'font',
        FONT_COUNT = 12,
        FONT_COLOR_CLASS_PREFIX = 'fc',
        FONT_COLOR_COUNT = 12;

    //word status
    const
        NOT_SHOWN = 0,
        SUCCESS = 1,
        TRY_AGAIN = 2;

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

    wordMgr.refreshStats = function() {
        completedWords = 0;
        for(w of wordMgr.words){
            if(w.status === SUCCESS){
                completedWords++;
            }
        }
    }

    $(document).on('state-next_word', function(event){
        var nextWord = findNextWord();

        prevWordIndex = curWordIndex;
        curWordIndex = nextWord;
        wordMgr.words[curWordIndex].attempts += 1;
        showWord(nextWord);
        sw.timer.clear().start();
    });

    $(document).on('state-word_success', function(event){
        wordMgr.words[curWordIndex].elapsed_time += sw.timer.getTime();
        wordMgr.words[curWordIndex].status = SUCCESS;
        sw.stateManager.nextWord();
        //TODO put back to api
    });

    $(document).on('state-word_fail', function(event){
        wordMgr.words[curWordIndex].elapsed_time += sw.timer.getTime();
        wordMgr.words[curWordIndex].status = TRY_AGAIN;
        sw.stateManager.nextWord();
        //TODO put back to api
    });

    $(document).on('state-go_back', function(event){
        //TODO update prev word to TRY_AGAIN state and put back to api
        curWordIndex = prevWordIndex;
        showWord(curWordIndex);
    });

    function showWord(wordIndex) {
        var untransformedWord = sw.words[wordIndex].word,
            transformFunc;

        $sightWordContainer.removeClass(ALL_FONT_CLASSES).addClass(FONT_CLASS_PREFIX + sw.getRand(0, FONT_COUNT - 1));
        $sightWordContainer.removeClass(ALL_FONT_SIZE_CLASSES).addClass(FONT_SIZE_CLASS_PREFIX + sw.getRand(0, FONT_SIZE_COUNT - 1));
        $sightWordContainer.removeClass(ALL_FONT_COLOR_CLASSES).addClass(FONT_COLOR_CLASS_PREFIX + sw.getRand(0, FONT_COLOR_COUNT - 1));

        if(sw.words[wordIndex].dotransform === false){
            $sightWordContainer.text(untransformedWord);
        }else{
            transformFunc = sw.getRandItem(TRANSFORM_FUNCS);
            $sightWordContainer.text(transformFunc(untransformedWord));
        }
    }

    function findNextWord(cnt){
        var idx = sw.getRand(0, sw.words.length),
            cnt = cnt || 0;

        if(cnt === sw.words.length){
            throw new Error("no more words available");
        }

        if(sw.words[idx].status === SUCCESS){
            findNextWord(cnt+1);
        }else{
            return idx;
        }
    }

})(sw.wordManager, jQuery);
