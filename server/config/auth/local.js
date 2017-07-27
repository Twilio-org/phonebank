import passport from 'passport';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';

import Users from '../../db/models/users';

const LocalStrategy = passportLocal.Strategy;

function serializeLogin(passportObj) {
  passportObj.serializeUser((user, done) => {
    done(null, user.id);
  });

  passportObj.deserializeUser((id, done) => {
    new Users({ id }).fetch()
      .then(user => done(null, user))
      .catch(err => done(err));
  });
}

passport.use('local', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, username, password, done) => {
    new Users({ username }).fetch()
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      if(!bcrypt.compare(password, user.password)) {
          alert('invalid password');
          return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      console.log('error loging in user: ', err);
    });
  }
));

 export { passport, serializeLogin };
