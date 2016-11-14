var sw = sw || {};
sw.stateManager = sw.stateManager || {};

(function(stateMgr, $){

    const STATES = [
        'USER_SELECT',
        'INITIALIZING',
        'START_NEW_GAME',
        'CONTINUE_SAVED_GAME',
        'GAME_RUNNING',
        'GAME_PAUSED',
        'GAME_EXIT',
        'GAME_COMPLETE'],
        $document = $(document);


    var currentState;

    stateMgr.getCurrentState = function() {
        return currentState;
    }

    stateMgr.userSelect = function($target) {
        _triggerEvent('user_select', $target);
    };

    stateMgr.initializing = function(userId, $target) {
        _triggerEventWithData('initializing', {"userId": userId}, $target);
    };

    stateMgr.configureNewGame = function(userId, $target) {
        _triggerEventWithData('configure_new_game', {"userId": userId}, $target);
    };

    stateMgr.startNewGame = function(userId, $target) {
        _triggerEventWithData('start_new_game', {"userId": userId}, $target);
    };

    stateMgr.continueSavedGame = function(userId, gameId, $target) {
        _triggerEventWithData('continue_saved_game', {"userId": userId, "gameId": gameId}, $target);
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
