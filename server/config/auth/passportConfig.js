import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../../db/controllers/users';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { development as devconfig } from '../../../knexfile';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import Model from '../../db/models/users';
import bookshelf from '../../db/init';
const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const usersModel = Model(knexdb);
knexdb.plugin(bookshelfBcrypt);
dotenv.config();

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.secretOrKey;

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
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
