import genToken from '../config/auth/jwt';
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
  const id = req.user.id;
  const token = genToken(id);

  res.status(201).json({ message: 'login succesful', token, id });
}

export function logout(req, res) {
  req.logout();
  res.status(201).json(req.user);
}
