import express from 'express';
import { passport } from '../auth/local';

import { createNewQuestion,
         fetchAllQuestions,
         fetchQuestionById } from '../../controllers/questions';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(fetchAllQuestions);
router.route('/:id').get(fetchQuestionById);
router.route('/').post(createNewQuestion);

export default router;
