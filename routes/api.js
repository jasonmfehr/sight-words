var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

/*
  /words?grade=0&minLevel=1&maxLevel=2   (GET)
  /users                                 (GET)
  /users/{GUID}                          (GET,POST,PUT,DELETE)
  /users/{GUID}/data                     (GET,POST,PUT,DELETE)
  /users/{GUID}/data/{GUID}              (GET,POST,PUT,DELETE)
*/

router.get('/words',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  //TODO handle missing query string parameters
  db.getWords(req.query.grade, req.query.minLevel, req.query.maxLevel, function(words){
    console.log("words:" + JSON.stringify(words));
    res.write(JSON.stringify(words));
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
