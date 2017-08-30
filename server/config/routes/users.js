import express from 'express';
import { passport } from '../auth/local';
import { addCampaignToUser,
         deactivateUserById,
         getAllUsers,
         getUserById,
         getUserCampaigns,
         manageUserById,
         updateUserById } from '../../controllers/users';
import { recordAttempt } from '../../controllers/calls';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/manage').patch(manageUserById);
router.route('/:id/campaigns').post(addCampaignToUser);
router.route('/:id/campaigns').get(getUserCampaigns);
router.route('/:id/campaigns/:campaign_id/calls/:call_id').put(recordAttempt);

export default router;
