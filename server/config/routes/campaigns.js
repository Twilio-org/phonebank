import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns, updateCampaignStatus } from '../../controllers/campaigns';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/').get(getAllCampaigns);
router.route('/:id').put(updateCampaignStatus);

export default router;
