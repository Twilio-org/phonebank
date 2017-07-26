import express from 'express';
import passport from 'passport';
import { development as devconfig } from '../../knexfile';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import User from '../db/controllers/users';
const { bookshelf } = require('../db/init').default;
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);
let usersModel = require('../db/models/users').default;
knexdb.plugin(bookshelfBcrypt);
usersModel = usersModel(knexdb);



const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/:id', (req, res) => {
  console.log('meow')
  const requestedUserId = req.params.id;

  User.getUserById({ id: requestedUserId }, usersModel)
    .then((user) => {
      res.status(200).send(user);
    });
});

router.put('/:id', (req, res) => {
  const userParams = req.body;
  userParams.id = req.params.id;

  users.updateUserById(userParams)
    .then(() => {
      res.status(200).send('Record Successfully Updated');
    });
});

router.patch('/:id', (req, res) => {
  users.deactivateUserById({ id: req.params.id })
    .then(() => {
      res.status(200).send('User Successfully Deactivated');
    });
});

export default router;
