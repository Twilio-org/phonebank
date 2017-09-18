import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns } from '../../controllers/campaigns';
import getCampaignMetrics from '../../controllers/metrics';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/').get(getAllCampaigns);
router.route('/:id/metrics').get(getCampaignMetrics);

export default router;
