import express from 'express';
import { passport } from '../auth/local';
import { saveNewQuestion,
         getAllQuestions,
         getQuestionById } from '../../controllers/questions';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllQuestions);
router.route('/:id').get(getQuestionById);
router.route('/').post(saveNewQuestion);

export default router;
