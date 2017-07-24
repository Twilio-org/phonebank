var express = require('express');
var users = require('../db/controllers/users')
var passport = require('passport');
var router = express.Router();

router.post('/', function(req, res, next) {
  var userParams = req.body;

  users.newUser(userParams)
  .then(function(user){
    if (user) {
      res.status(201).json({ message: 'Registration Successful' });
    }
  })
  .catch(function(err){
    console.log(err)
    res.status(401).json({ message: 'Registration Unsuccessful' });
  });
});

module.exports = router;
