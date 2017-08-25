import express from 'express';
import { passport } from '../auth/local';
import { getUserById,
         updateUserById,
         deactivateUserById,
         getAllUsers } from '../../controllers/users';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);

export default router;
