var express = require('express');
var router = express.Router();

//using wildcard routing for '/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
