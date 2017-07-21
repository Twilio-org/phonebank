var express = require('express');
var tokenGenerator = require('../config/auth/jwtGenerator');
var router  = express.Router();

router.post('/', function(req, res) {
  var reqEmail = req.body.email;
  var reqPassword = req.body.password;

  if (reqEmail && reqPassword) {
    var user = getUserByEmail({ email: reqEmail });

    if (!user) {
      res.status(401).json({ message: "invalid username or password" });
    }

    if (user.password === req.body.password) {
      var token tokenGenerator();
      res.json({
        message: "login successful",
        token: token
      });
    } else {
      res.status(401).json({ message: "passwords did not match" });
    }
  }

});

router.delete('/', function(req, res, next) {
  res.send('responding to a DELETE request at /sessions')
});

module.exports = router;
