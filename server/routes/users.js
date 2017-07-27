import express from 'express';
import passport from 'passport';
import { development as devconfig } from '../../knexfile';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import User from '../db/controllers/users';
import bookshelf from '../db/init';
import Model from '../db/models/users';
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);
const usersModel = Model(knexdb);
knexdb.plugin(bookshelfBcrypt);

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/:id', (req, res) => {
  const requestedUserId = req.params.id;

  User.getUserById({ id: requestedUserId }, usersModel)
    .then((user) => {
      if (!user) {
        res.status(400).send('No user found with given ID');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put('/:id', (req, res) => {
  const userParams = req.body;
  userParams.id = req.params.id;

  User.updateUserById(userParams, usersModel)
    .then(() => {
      res.status(200).send('Record Successfully Updated');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch('/:id', (req, res) => {
  User.deactivateUserById({ id: req.params.id }, usersModel)
    .then(() => {
      res.status(200).send('User Successfully Deactivated');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;
