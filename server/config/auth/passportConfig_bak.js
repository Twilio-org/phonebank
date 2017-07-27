import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import User from '../../db/services/users';
import { development as devconfig } from '../../../knexfile';

const { bookshelf } = require('../../db/init').default;
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let usersModel = require('../../db/models/users').default;

knexdb.plugin(bookshelfBcrypt);
usersModel = usersModel(knexdb);

dotenv.config();

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received', jwtPayload);
  User.getUserById({ id: jwtPayload.id }, usersModel)
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
});

passport.use(strategy);

export { passport };
export { jwtOptions };
