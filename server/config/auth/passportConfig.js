import passport from 'passport';
import passportJWT from 'passport-jwt';
import users from '../../db/controllers/users';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'JjS6E32hy1yBbhFN7uYI8t8IqpPy7xgw';

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
  jwtOptions,
};
