var sw = sw || {};
sw.stateManager = sw.stateManager || {};

(function(stateMgr, $){

    const $document = $(document);


    //TODO switch to managing userId/gameId here
    var currentState,
        userId,
        gameId;

    stateMgr.getCurrentState = function() {
        return currentState;
    }

    stateMgr.userSelect = function($target) {
        _triggerEvent('user_select', $target);
    };

    stateMgr.initializing = function(userId, $target) {
        stateMgr.userId = userId;
        _triggerEvent('initializing', $target);
    };

    stateMgr.configureNewGame = function($target) {
        _triggerEvent('configure_new_game', $target);
    };

    stateMgr.startNewGame = function(minLevel, maxLevel, $target) {
        _triggerEventWithData('start_new_game', {"minLevel": minLevel, "maxLevel": maxLevel}, $target);
    };

    stateMgr.continueSavedGame = function($target) {
        _triggerEvent('continue_saved_game', $target);
    };

    stateMgr.gameRunning = function($target) {
        currentState = 'game_running';
        $target.trigger($.Event('state-game_running'));
    };

    stateMgr.gamePaused = function($target) {
        currentState = 'game_paused';
        $target.trigger($.Event('state-game_paused'));
    };

    stateMgr.gameExit = function($target) {
        currentState = 'game_exit';
        $target.trigger($.Event('state-game_exit'));
    };

    stateMgr.gameComplete = function($target) {
        currentState = 'game_complete';
        $target.trigger($.Event('state-game_complete'));
    };

    function _triggerEvent(eventName, $target) {
        currentState = eventName;

        if(typeof($target) === 'undefined'){
            $document.trigger($.Event('state-' + eventName));
        }else{
            $target.trigger($.Event('state-' + eventName));
        }
    }

    function _triggerEventWithData(eventName, data, $target) {
        currentState = eventName;

        if(typeof($target) === 'undefined'){
            $document.trigger($.Event('state-' + eventName, data));
        }else{
            $target.trigger($.Event('state-' + eventName), data);
        }
    }

})(sw.stateManager, jQuery);
