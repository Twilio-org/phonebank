import express from 'express';
import { addCampaignToUser,
         deactivateUserById,
         getAllUsers,
         getUserById,
         getUserCampaigns,
         manageUserById,
         updateUserById } from '../../controllers/users';
import { assignCall, recordAttempt } from '../../controllers/calls';
import { passport } from '../auth/local';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/manage').put(manageUserById);
router.route('/:id/campaigns').post(addCampaignToUser);
router.route('/:id/campaigns').get(getUserCampaigns);
router.route('/:id/campaigns/:campaign_id/calls').post(assignCall);
router.route('/:id/campaigns/:campaign_id/calls/:call_id').put(recordAttempt);

export default router;
