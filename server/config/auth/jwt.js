import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import usersService from '../../db/services/users';
import { development as devconfig } from '../../../knexfile';
import User from '../../db/models/users';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);

bookshelf.plugin(bookshelfBcrypt);
const UsersModel = User(bookshelf);

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.secretOrKey
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received', jwtPayload);
  usersService.getUserById({ id: jwtPayload.id }, UsersModel)
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
}));

export default function genToken(userId) {
  const payload = { id: userId };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  return token;
}
