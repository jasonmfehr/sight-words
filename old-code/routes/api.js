var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

/*
    /users                                      (GET) - list all user names
    /users?includeInProgress=true               (GET) - list all user names and whether or not they have in progress games
    /users/{GUID}/games?inprogress=true&limit=1 (GET) - list games for a user
    /users/{GUID}/games                         (POST) - create new game, returns games json
        - min level
        - max level
    /games/levels                               (GET) - returns the min and max available level for words
    /games/{GUID}/words            (GET) - retrieve games json
    /games/{GUID}/words/{GUID}     (PUT) - update a single word in the game
        - status
        - attempts
        - elapsed_time


    sample curl commands:
        - curl -i 'http://localhost:3000/api/users/0e13fd5e-613d-4401-8c63-c4e221650537/games?inprogress=true'
        - curl -i -X POST -d '{"minLevel":0,"maxLevel":5}' -H "Content-Type: application/json" 'http://localhost:3000/api/users/0e13fd5e-613d-4401-8c63-c4e221650537/games'
*/

router.get('/users', function(req,res){
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(req.query.includeInProgress === 'true'){
        //TODO probably will not be needed
        db.listUsersAndInProgressGames(function(users){
            res.write(JSON.stringify(users));
            res.end();
        });
    }else{
        db.listUsers(function(users){
            res.write(JSON.stringify(users));
            res.end();
        });
    }
});

router.get('/users/:userId/games', function(req,res){
    var lmt;

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(req.query.limit && !isNaN(req.query.limit)){
        lmt = parseInt(req.query.limit);
    }else{
        lmt = 'ALL';
    }

    if(req.query.inprogress){
        db.listGamesSpecifyInProgress(req.params.userId, (req.query.inprogress !== 'false'), lmt, function(games){
            res.write(JSON.stringify(games));
            res.end();
        });
    }else{
        db.listGames(req.params.userId, lmt, function(games){
            res.write(JSON.stringify(games));
            res.end();
        });
    }

});

router.post('/users/:userId/games', function(req,res){
    var minLevel = parseInt(req.body.minLevel),
        maxLevel = parseInt(req.body.maxLevel);

    if(isNaN(minLevel) || isNaN(maxLevel)){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({"message": "both minLevel and maxLevel must be provided and must be integers"}));
        res.end();
    }else{
        db.addGame(req.params.userId, minLevel, maxLevel, function(newGameWords){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(newGameWords));
            res.end();
        });
    }
});

router.get('/games/levels', function(req,res){
    db.getGameLevels(function(data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });
});

router.get('/games/:gameId/words', function(req,res){
    db.getGame(req.params.gameId, function(data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });
});

router.put('/games/:gameId/words/:wordId', function(req,res){
    var status = req.body.status,
        attempts = parseInt(req.body.attempts),
        elapsed_time = parseInt(req.body.elapsed_time);

    if(!status){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({"message": "status body parameter is required"}));
        res.end();
    }else if(isNaN(attempts)){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({"message": "attempts body parameter must be an integer"}));
        res.end();
    }else if(isNaN(elapsed_time)){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({"message": "elapsed_time body parameter must be an integer"}));
        res.end();
    }else{
        db.updateGameWord(req.params.gameId, req.params.wordId, status, attempts, elapsed_time, function(success){
            if(success){
                res.writeHead(200, { 'Content-Type': 'application/json' });
            }else{
                res.writeHead(400, { 'Content-Type': 'application/json' });
            }

            res.end();
        });
    }
});

module.exports = router;
