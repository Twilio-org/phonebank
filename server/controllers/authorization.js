import jwt from 'jsonwebtoken';
import usersService from '../db/services/users';

export function register(req, res, next) {
  const userParams = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phone_number
  };

  usersService.saveNewUser(userParams)
    .then((user) => {
      if (user) {
        res.status(201).json({ message: 'Registration Successful' });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Registration Unsuccessful' });
    });
}

export function login(req, res) {
  const payload = { id: req.user.id, org_id: req.user.org_id, username: req.user.username };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  res.status(201).json({ message: "OK", token: token, id: req.user.id });
}
