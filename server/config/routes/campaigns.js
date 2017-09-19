import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns, updateCampaignById, getCampaignById } from '../../controllers/campaigns';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/').get(getAllCampaigns);
router.route('/:id').get(getCampaignById);
router.route('/:id').put(updateCampaignById);

export default router;
