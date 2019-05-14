var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs=monk('mongodb://admin:admin123@ds155916.mlab.com:55916/my_cricket_adda');
var score 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

//score post method
router.post('/score_update', function(req, res){
	var score = req.body.score;

})

// over method
router.post('/over_update', function(req, res){
	var ball = req.body.ball;
	res.send(ball);
});
module.exports = router;
