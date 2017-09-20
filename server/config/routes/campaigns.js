import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns, updateCampaignById } from '../../controllers/campaigns';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/').get(getAllCampaigns);
router.route('/:id').put(updateCampaignById);

export default router;
