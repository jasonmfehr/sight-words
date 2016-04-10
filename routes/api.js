var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

/*
  /users                      (GET)
  /users/{GUID}               (GET,POST,PUT,DELETE)
  /users/{GUID}/data          (GET,POST,PUT,DELETE)
  /users/{GUID}/data/{GUID}   (GET,POST,PUT,DELETE)


*/
router.get('/users',function(req,res){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  db.listUsers(function(users){
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
  db.getGames(req.params.personId, (gamesDetails) => {res.write(JSON.stringify(gamesDetails)); res.end();})
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
