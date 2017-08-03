import express from 'express';
import { passport } from '../auth/local';
import { saveNewScript,
         getAllScripts,
         getScriptById,
         updateScriptById,
         deleteScriptById } from '../../controllers/questions';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(saveNewScript);
router.route('/').get(getAllScripts);
router.route('/:id').get(getScriptById);
router.route('/:id').put(updateScriptById);
router.route('/:id').delete(deleteScriptById);

export default router;
