import express from 'express';
// import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns, updateCampaignById, getCampaignById, getCsv } from '../../controllers/campaigns';
import getCampaignMetrics from '../../controllers/metrics';

const router = express.Router();

// router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/').get(getAllCampaigns);
router.route('/:id').get(getCampaignById);
router.route('/:id/metrics').get(getCampaignMetrics);
router.route('/:id').put(updateCampaignById);
router.route('/:id/csv').get(getCsv);
export default router;
