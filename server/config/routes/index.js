import express from 'express';
import serveReactApp from '../../controllers/index';

const router = express.Router();

router.route('/').get(serveReactApp);

export default router;
