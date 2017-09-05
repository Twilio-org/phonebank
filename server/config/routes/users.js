import express from 'express';
// import { passport } from '../auth/local';
import { addCampaignToUser,
         getAllUsers,
         getUserById,
         getUserCampaigns,
         deactivateUserById,
         manageUserById,
         updateUserById,
         getUserCampaignAssociation,
         updateUserCallSidField,
         clearUserCallSidField } from '../../controllers/users';

import { assignCall } from '../../controllers/calls';


const router = express.Router();

// router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/manage').put(manageUserById);
router.route('/:id/campaigns').post(addCampaignToUser);
router.route('/:id/campaigns').get(getUserCampaigns);
router.route('/:id/campaigns/:campaign_id').get(getUserCampaignAssociation);
router.route('/:id/campaigns/:campaign_id/calls').get(assignCall);
router.route('/:id/campaigns/:campaign_id/calls').post(updateUserCallSidField);
router.route('/:id/campaigns/:campaign_id/calls').delete(clearUserCallSidField);

export default router;
