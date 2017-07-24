import express from 'express';
import bcrypt from 'bcrypt';
import genToken from '../config/auth/jwtGenerator';
import User from '../db/controllers/users';

const router = express.Router();

router.post('/', (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  if (reqEmail && reqPassword) {
    User.getUserByEmail({ email: reqEmail })
      .then((user) => {
        if (!user) {
          console.log('user not found');
          res.status(401).json({ message: 'invalid username or password' });
        }

        if (bcrypt.compare(reqPassword, user.password)) {
          console.log('password match');
          const token = genToken(user.id);
          res.json({
            message: 'login successful',
            token,
          });
        } else {
          console.log('password no match');
          res.status(401).json({ message: 'invalid username or password' });
        }
      });
  }
});

export default router;
