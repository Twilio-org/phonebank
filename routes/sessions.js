var express = require('express');
var router  = express.Router();

router.post('/', function(req, res, next) {
  res.send('Responding to a post request at /sessions.');
});

router.delete('/', function(req, res, next) {
  res.send('Responding to a delete request at /sessions.')
});

module.exports = router;
