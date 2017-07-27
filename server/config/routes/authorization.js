import express from 'express';
import passport from 'passport';
import { login, logout, register } from '../../controllers/authorization';
import { saveNewUser } from '../../controllers/users';

const router = express.Router();

router.route('/login').post(
  passport.authenticate('jwt',
  { session: false }, login)
);
router.route('/logout').get(logout);
router.route('/register').post(
  register,
  passport.authenticate('local'),
  saveNewUser);
