var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

/*
    /users                                      (GET) - list all user names
    /users/{GUID}/games?inprogress=true&limit=1 (GET) - list games for a user
    /users/{GUID}/games                         (POST) - create new game, returns games json
        - min level
        - max level
    /users/{GUID}/games/{GUID}/words            (GET) - retrieve games json
    /users/{GUID}/games/{GUID}/words/{GUID}     (PUT) - update a single word in the game
        - status
        - attempts
        - elapsed_time


    sample curl commands:
        - curl -i 'http://localhost:3000/api/users/0e13fd5e-613d-4401-8c63-c4e221650537/games?inprogress=true'
        - curl -i -X POST -d '{"minLevel":0,"maxLevel":5}' -H "Content-Type: application/json" 'http://localhost:3000/api/users/0e13fd5e-613d-4401-8c63-c4e221650537/games'
*/

router.get('/users', function(req,res){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    db.listUsers(function(users){
        res.write(JSON.stringify(users));
        res.end();
    });
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
        db.addGame(req.params.userId, minLevel, maxLevel, function(newGameId){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({"newGameId": newGameId}));
            res.end();
        });
    }
});

router.get('/users/:userId/games/:gameId/words', function(req,res){
    db.getGame(req.params.gameId, function(data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });
});

module.exports = router;
