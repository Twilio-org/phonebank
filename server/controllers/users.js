import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import usersService from '../db/services/users';
import { development as devconfig } from '../../knexfile';
import User from '../db/models/users';
// import bookshelfCreateTable from '../db/init';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);
const UsersModel = User(bookshelf);

function cleanUserObject(user) {
  const cleanUser = user;
  delete cleanUser.attributes.password_hash;
  return cleanUser;
}

export function getUserByEmail(req, res, next) {
  const params = {
    email: req.body.email
  };

  return usersService.getUserByEmail(params, UsersModel)
    .then((user) => {
      if (user) {
        const userObject = cleanUserObject(user);

        res.status(200).json(userObject);
      }
      next();
    }).catch((err) => {
      console.log('could not add user ', err);
    });
}

export function getUserById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return usersService.getUserById(params, UsersModel)
    .then((user) => {
      if (user) {
        const userObject = cleanUserObject(user);

        res.status(200).json(userObject);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch user by id: ', err);
    });
}

export function updateUserById(req, res, next) {
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

export function deactivateUserById(req, res, next) {
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
