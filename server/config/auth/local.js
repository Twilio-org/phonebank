import passport from 'passport';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import userServices from '../../db/services/users';
import { development as devconfig } from '../../../knexfile';
import User from '../../db/models/users';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
bookshelf.plugin(bookshelfBcrypt);
const UsersModel = User(bookshelf);

const LocalStrategy = passportLocal.Strategy;

function serializeLogin(passportObj) {
  passportObj.serializeUser((user, done) => {
    done(null, user.id);
  });

  passportObj.deserializeUser((id, done) => {
    userServices.getUserById({ id }, UsersModel)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
}

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    userServices.getUserByEmail({ email }, UsersModel)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.attributes.passwordHash, (err, match) => {
          if (err) {
            return done(null, false);
          }
          if (match) {
            return done(null, user);
          }
          return done(null, false);
        });
        return done(null, false);
      })
      .catch((err) => {
        console.log('error loging in user: ', err);
      });
  }
));

export { passport };
export { serializeLogin };
