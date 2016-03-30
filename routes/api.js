var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/*
  /users                      (GET)
  /users/{GUID}               (GET,POST,PUT,DELETE)
  /users/{GUID}/data          (GET,POST,PUT,DELETE)
  /users/{GUID}/data/{GUID}   (GET,POST,PUT,DELETE)


*/
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

module.exports = router;
