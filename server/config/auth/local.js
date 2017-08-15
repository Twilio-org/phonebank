import passport from 'passport';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import userServices from '../../db/services/users';

const LocalStrategy = passportLocal.Strategy;

function serializeLogin(passportObj) {
  passportObj.serializeUser((user, done) => {
    done(null, user.id);
  });

  passportObj.deserializeUser((id, done) => {
    userServices.getUserById({ id })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
}

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    userServices.getUserByEmail({ email })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return bcrypt.compare(password, user.attributes.password_hash, (err, match) => {
          if (err) {
            return done(null, false);
          }
          if (match) {
            return done(null, user);
          }
          return done(null, false);
        });
      })
      .catch((err) => {
        console.log('error loging in user: ', err);
      });
  }
));

export { passport };
export { serializeLogin };
