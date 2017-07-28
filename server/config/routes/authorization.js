import express from 'express';
import passport from 'passport';
import { login, register } from '../../controllers/authorization';

const router = express.Router();

router.route('/login').post(passport.authenticate('local'), login);
router.route('/register').post(
  register,
  passport.authenticate('local'),
  login
);

export default router;
