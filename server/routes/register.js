import express from 'express';
import { development as devconfig } from '../../knexfile';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import User from '../db/controllers/users';
import Model from '../db/models/users';
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex).plugin(bookshelfBcrypt);
const usersModel = Model(knexdb);


const router = express.Router();

router.post('/', (req, res) => {
  const userParams = req.body;

  User.saveNewUser(userParams, usersModel)
    .then((user) => {
      if (user) {
        res.status(201).json({ message: 'Registration Successful' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Registration Unsuccessful' });
    });
});

export default router;
