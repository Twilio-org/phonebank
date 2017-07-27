import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import { getUserById,
         updateUserById,
         deactivateUserById } from '../../controllers/users';
import { development as devconfig } from '../../knexfile';
import { User as UsersModel } from '../db/models/users';

const knex = knexModule(devconfig);
const knexdb = bookshelfModule(knex);

knexdb.plugin(bookshelfBcrypt);
usersModel = usersModel(knexdb);


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.secretOrKey
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received', jwtPayload);
  User.getUserById({ id: jwtPayload.id }, usersModel)
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
}))

export default function genToken(userId) {
  const payload = { id: userId };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  return token;
}
