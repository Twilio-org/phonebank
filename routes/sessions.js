var express = require('express');
var router  = express.Router();

router.post('/', function(req, res, next) {
  res.status(201).send('responding to a POST request at /sessions');
});

router.delete('/', function(req, res, next) {
  res.send('responding to a DELETE request at /sessions')
});

module.exports = router;
