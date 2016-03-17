var express = require('express');
var router = express.Router();
const INDEX_HTML = path.join(__dirname+'/index.html');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/',function(req,res){
  res.sendFile(INDEX_HTML);
});

module.exports = router;
