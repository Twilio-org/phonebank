import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import usersService from '../db/services/users';
import { development as devconfig } from '../../knexfile';
import User from '../db/models/users';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);
const UsersModel = User(bookshelf);

export function getUserByEmail(req, res, next) {
  const params = {
    email: req.body.email
  };

  return usersService.getUserByEmail(params, UsersModel)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      }
      next();
    }).catch((err) => {
      console.log('could not add user ', err);
    });
}

export function getUserById(req, res, next) {
  if (req.user.attributes.is_admin === true || req.user.id === parseInt(req.params.id, 10)) {
    const params = {
      id: req.params.id
    };

    return usersService.getUserById(params, UsersModel)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch user by id: ', err);
    });
  }
  return res.status(401).json({ message: 'not authorized' });
}

export function updateUserById(req, res, next) {
  if (req.user.attributes.is_admin === true || req.user.id === parseInt(req.params.id, 10)) {
    const params = {
      id: req.params.id,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      password: req.body.password,
      phoneNumber: req.body.phone_number,
      email: req.body.email
    };

    return usersService.updateUserById(params, UsersModel)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update user: ', err);
    });
  }
  return res.status(401).json({ message: 'not authorized' });
}

export function deactivateUserById(req, res, next) {
  if (req.user.attributes.is_admin === true || req.user.id === parseInt(req.params.id, 10)) {
    const params = {
      id: req.params.id
    };

    return usersService.deactivateUserById(params, UsersModel)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not deactivateUser', err);
    });
  }
  return res.status(401).json({ message: 'not authorized' });
}
