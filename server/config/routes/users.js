import express from 'express';
import { passport } from '../auth/local';
import { getUserById,
         updateUserById,
         deactivateUserById,
         manageUserById,
         getAllUsers } from '../../controllers/users';
import { assignCall } from '../../controllers/calls';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/manage').patch(manageUserById);
router.route('/:id/campaigns/:campaign_id/calls').post(assignCall);

export default router;
