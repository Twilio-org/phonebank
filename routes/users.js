var express = require('express');
var users = require('../db/controllers/users')
var router = express.Router();
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var requested_user_id = req.params.id

  users.getUserById({ id: requested_user_id })
  .then(function(model){
    res.status(200).send(model);
  });
});

router.post('/', function(req, res, next) {
  var userParams = req.body;

  users.newUser(userParams);
  res.status(201).send('responding to a POST at /users');
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
  var userParams = {
    id: req.params.id
  };

  users.deactivateUserById(userParams)
  .then(function(model) {
    res.status(200).send('User Successfully Deactivated');
  });
});

module.exports = router;
