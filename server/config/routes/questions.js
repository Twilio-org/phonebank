import express from 'express';

import { createNewQuestion,
         fetchAllQuestions,
         fetchQuestionById } from '../../controllers/questions';

const router = express.Router();

router.route('/').get(fetchAllQuestions);
router.route('/:id').get(fetchQuestionById);
router.route('/').post(createNewQuestion);

export default router;
