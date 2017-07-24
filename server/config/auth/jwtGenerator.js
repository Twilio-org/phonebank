import jwt from 'jsonwebtoken';
import passportConfig from './passportConfig';

export default function genToken(userId) {
  const payload = { id: userId };
  const token = jwt.sign(payload, passportConfig.jwtOptions.secretOrKey);

  return token;
}
