var express = require('express');
var users = require('../db/controllers/users')
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responding to a GET at /users');
});

router.post('/', function(req, res, next) {
  users.newUser(req.body);
  res.status(201).send('responding to a POST at /users');
});

router.put('/', function(req, res, next) {
  // res.writeHead(204)
  res.status(200).send('responding to a PUT at /users');
});

router.patch('/', function(req, res, next) {
  // res.writeHead(204)
  res.status(200).send('responding to a PATCH at /users');
});

module.exports = router;
