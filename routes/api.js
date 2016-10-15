var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

/*
    /users                                      (GET) - list all user names
    /users/{GUID}/games?inprogress=true&limit=1 (GET) - list games for a user
    /users/{GUID}/games                         (POST) - create new game
        - min level
        - max level
    /users/{GUID}/games/{GUID}                  (GET) - retrieve in progress games json
    /users/{GUID}/games/{GUID}/words/{GUID}     (PUT) - update a single word in the game
        - status
        - attempts
        - elapsed_time
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
        db.listGames(req.params.userId, (req.query.inprogress !== 'false'), lmt, function(games){
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

///////////////////////////////////////////////////////////////////////////////
// OLD FUNCTIONS                                                             //
///////////////////////////////////////////////////////////////////////////////
/*
router.get('/words',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  //TODO handle missing query string parameters
  db.getWords(req.query.grade, req.query.minLevel, req.query.maxLevel, function(words){
    res.write(JSON.stringify(words));
    res.end();
  });
});

router.get('/gradeLevels',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  db.getGradeLevels(function(levels){
    res.write(JSON.stringify(levels));
    res.end();
  });
});

router.get('/users',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  db.listUsers(function(users){
    console.log("users:" + JSON.stringify(users));
    res.write(JSON.stringify(users));
    res.end();
  });
});

router.get('/users/:userId',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  db.getUserAndPeople(req.params.userId, (userDetails) => {res.write(JSON.stringify(userDetails)); res.end();})
});

router.get('/person/:personId/games',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  if(req.query.status === 'inProgress'){
    db.getInProgressGame(req.params.personId, (gamesDetails) => {res.write(JSON.stringify(gamesDetails)); res.end();})
  }else{
    db.getGames(req.params.personId, (gamesDetails) => {res.write(JSON.stringify(gamesDetails)); res.end();})
  }
});

router.post('/person/:personId/games',function(req,res){
  db.addGame(req.params.personId, req.body, (newGameId) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{"gameId": "' + newGameId + '"}');
    res.end();
  });
});

router.put('/games/:gameId',function(req,res){
  db.saveGame(req.params.gameId, req.body, (updatedRows) => {
    if(updateRows === 0){
      res.writeHead(500);
    }else{
      res.writeHead(204);
    }

    res.end();
  });
});
*/

/*
db.hasInProgressGame('4e417958-e32a-4a34-9693-a22fd73d0cdc', function(result) {
  console.log('user has in progress: ' + result);
});
*/

/*
db.addGame('4e417958-e32a-4a34-9693-a22fd73d0cdc', '{"foo1":"bar1"}', function(newUuid) {
  console.log('the new uuid is: ' + newUuid);
  db.getInProgressGame('4e417958-e32a-4a34-9693-a22fd73d0cdc', (game) => {
    console.log("new game obj is: " + JSON.stringify(game));
  });
});
*/

/*
db.endGame('d42338d5-7421-45ea-8f84-9c694f4665b3', function(affectedRow) {
  console.log('ended games count: ' + affectedRow);
});
*/

/*
db.listUsers(function(users) {
  console.log('users: ' + JSON.stringify(users));
});
*/

module.exports = router;
