import express from 'express';
import users from '../db/controllers/users';

const router = express.Router();

router.post('/', (req, res) => {
  const userParams = req.body;

  users.saveNewUser(userParams)
    .then((user) => {
      if (user) {
        res.status(201).json({ message: 'Registration Successful' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Registration Unsuccessful' });
    });
});

export default router;
