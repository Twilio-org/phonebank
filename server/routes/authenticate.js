import express from 'express';
import bcrypt from 'bcrypt';
import genToken from '../config/auth/jwtGenerator';
import User from '../db/controllers/users';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { development as devconfig } from '../../knexfile';
import bookshelfBcrypt from 'bookshelf-bcrypt';
const { initializeDB, bookshelf } = require('../db/init').default;
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);
let usersModel = require('../db/models/users').default;
knexdb.plugin(bookshelfBcrypt);
usersModel = usersModel(knexdb);

const router = express.Router();

router.post('/', (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  if (reqEmail && reqPassword) {
    User.getUserByEmail({ email: reqEmail }, usersModel)
      .then((user) => {
        if (!user) {
          console.log('user not found');
          res.status(401).send({ message: 'invalid username or password' });
        } else {
          bcrypt.compare(reqPassword, user.attributes.password_hash, (err, match) => {
            if (err) {
              console.log(err.message);
              res.status(500).send(err.message);
            }
            if (match) {
              console.log('password match');
              const token = genToken(user.id);
              res.status(201).json({
                message: 'login successful',
                token,
              });
            } else {
              console.log('invalid password');
              res.status(401).json({ message: 'invalid username or password' });
            }
          })
        }
      })
  } else {
    res.status(401).json({ message: 'invalid username or password' });
  }
})

export default router;
