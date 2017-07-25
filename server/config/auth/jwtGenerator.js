import jwt from 'jsonwebtoken';
import { jwtOptions } from './passportConfig';

export default function genToken(userId) {
  const payload = { id: userId };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  return token;
}
