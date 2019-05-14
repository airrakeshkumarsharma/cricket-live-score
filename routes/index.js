var express = require('express');
var router = express.Router();
var monk = require('monk');  //get the monk javascript
var moment = require('moment'); //get the moment data
var dbs=monk('mongodb://admin:admin123@ds155916.mlab.com:55916/my_cricket_adda');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

module.exports = router;
