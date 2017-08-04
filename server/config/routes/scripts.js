import express from 'express';

import { saveNewScript,
         getAllScripts,
         getScriptById,
         updateScriptById,
         addQuestionToScript,
         getQuestionsByScriptId,
         deleteScriptById } from '../../controllers/scripts';

const router = express.Router();

router.route('/').post(saveNewScript);
router.route('/').get(getAllScripts);
router.route('/:id').get(getScriptById);
router.route('/:id').put(updateScriptById);
router.route('/:id').delete(deleteScriptById);
router.route('/:id/scriptQuestions/').post(addQuestionToScript);
router.route('/:id/scriptQuestions/').get(getQuestionsByScriptId);

export default router;
