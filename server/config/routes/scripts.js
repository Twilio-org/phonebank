import express from 'express';
import { passport } from '../auth/local';

import { getScriptById,
         updateScriptById,
         addQuestionToScript,
         getQuestionsByScriptId,
         deleteScriptById } from '../../controllers/scripts';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));


router.route('/:id').get(getScriptById);
router.route('/:id').put(updateScriptById);
// maybe not delete, soft or hard?
router.route('/:id').delete(deleteScriptById);

router.route('/addQuestionToScript/:scriptId/:questionId').post(addQuestionToScript);
router.route('/getQuestionsInScript/:id').get(getQuestionsByScriptId);

export default router;

