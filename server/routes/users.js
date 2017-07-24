import express from 'express';
import passport from 'passport';
import users from '../db/controllers/users';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/:id', (req, res) => {
  const requestedUserId = req.params.id;

  users.getUserById({ id: requestedUserId })
    .then((model) => {
      res.status(200).send(model);
    });
});

router.put('/:id', (req, res) => {
  const userParams = req.body;
  userParams.id = req.params.id;

  users.updateUserById(userParams)
    .then(() => {
      res.status(200).send('Record Successfully Updated');
    });
});

router.patch('/:id', (req, res) => {
  users.deactivateUserById({ id: req.params.id })
    .then(() => {
      res.status(200).send('User Successfully Deactivated');
    });
});

export default router;
