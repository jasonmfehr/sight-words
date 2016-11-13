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
        'GAME_COMPLETE'];

    var currentState;

    stateMgr.getCurrentState = function() {
        return currentState;
    }

    stateMgr.userSelect = function($target) {
        currentState = 'user_select';
        $target.trigger($.Event('state-user_select'));
    };

    stateMgr.initializing = function($target, userId) {
        currentState = 'initializing';
        $target.trigger($.Event('state-initializing', {"userId": userId}));
    };

    stateMgr.stateNewGame = function($target) {
        currentState = 'start_new_game';
        $target.trigger($.Event('state-start_new_game'));
    };

    stateMgr.continueSavedGame = function($target) {
        currentState = 'continue_saved_game';
        $target.trigger($.Event('state-continue_saved_game'));
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

})(sw.stateManager, jQuery);
