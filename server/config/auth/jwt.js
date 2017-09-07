import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import usersService from '../../db/services/users';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.secretOrKey
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received', jwtPayload);
  usersService.getUserById({ id: jwtPayload.id })
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
