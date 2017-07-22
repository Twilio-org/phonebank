var express = require('express');
var users = require('../db/controllers/users')
var passport = require('passport');
var router = express.Router();
/* GET users listing. */

router.use(passport.authenticate('jwt', { session: false }));

router.get('/:id', function(req, res, next) {
  var requested_user_id = req.params.id

  users.getUserById({ id: requested_user_id })
  .then(function(model){
    res.status(200).send(model);
  });
});

router.put('/:id', function(req, res, next) {
  var userParams = req.body;
  userParams.id = req.params.id;

  users.updateUserById(userParams)
  .then(function(model) {
    res.status(200).send('Record Successfully Updated');
  });
});

router.patch('/:id', function(req, res, next) {
  users.deactivateUserById({ id: req.params.id })
  .then(function(model) {
    res.status(200).send('User Successfully Deactivated');
  });
});

module.exports = router;
