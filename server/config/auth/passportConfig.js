import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import users from '../../db/controllers/users';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

dotenv.config();

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.secretOrKey;

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received', jwtPayload);
  users.getUserById({ id: jwtPayload.id })
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
});

passport.use(strategy);

export default {
  passport,
  jwtOptions
};
