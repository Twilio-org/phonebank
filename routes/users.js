var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responding to a GET at /users');
});

router.post('/', function(req, res, next) {
  res.send('responding to a POST at /users');
});

router.put('/', function(req, res, next) {
  res.send('responding to a PUT at /users');
});

router.patch('/', function(req, res, next) {
  res.send('responding to a PATCH at /users');
});

module.exports = router;
