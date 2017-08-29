import express from 'express';
import { passport } from '../auth/local';
import { getAllUsers,
         getUserById,
         getUserCampaigns,
         deactivateUserById,
         manageUserById,
         updateUserById } from '../../controllers/users';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/manage').patch(manageUserById);
router.route('/:id/campaigns').get(getUserCampaigns);

export default router;
