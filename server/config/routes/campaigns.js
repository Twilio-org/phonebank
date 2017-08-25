import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign, getAllCampaigns } from '../../controllers/campaigns';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewCampaign);
router.route('/:status').get(getAllCampaigns);

export default router;
