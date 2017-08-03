import express from 'express';
import { passport } from '../auth/local';
import { saveNewCampaign } from '../../controllers/campaigns';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/create').post(saveNewCampaign);

export default router;
