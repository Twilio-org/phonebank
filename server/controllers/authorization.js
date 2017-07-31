import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import genToken from '../config/auth/jwt';
import usersService from '../db/services/users';
import { development as devconfig } from '../../knexfile';
import User from '../db/models/users';
// import bookshelfCreateTable from '../db/init';
const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);
const UsersModel = User(bookshelf);

export function register(req, res, next) {
  const userParams = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phone_number
  };

  usersService.saveNewUser(userParams, UsersModel)
    .then((user) => {
      if (user) {
        res.status(201).json({ message: 'Registration Successful' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Registration Unsuccessful' });
    });
}

export function login(req, res) {
  console.log(req.user.id, 'req in login')
  const id = req.user.id;
  const token = genToken(id);

  res.status(201).json({ message: 'login succesful', token, id });
}

export function logout(req, res) {
  req.logout();
  res.status(201).json(req.user);
}
