import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import { saveNewQuestion, getAllQuestions, getQuestionById } from '../db/services/questions';
import Question from '../db/models/questions';
import { development as devconfig } from '../../knexfile';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const QuestionsModel = Question(bookshelf);

export function createNewQuestion(req, res, next) {
  const { title, description, type, responses } = req.body;
  const params = { title, description, type, responses };

  return saveNewQuestion(params, QuestionsModel)
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error creating new question (createNewQuestion), in server/controllers/questions.js: ', err);
    });
}

export function fetchAllQuestions(req, res, next) {
  return getAllQuestions()
    .then((questions) => {
      if (questions) {
        res.status(200).json(questions);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error fetching all questions (fetchAllQuestions) in server/controllers/questions.js', err);
    });
}

export function fetchQuestionById(req, res, next) {
  const { id } = req.body;
  return getQuestionById({ id })
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error fetching question by id (fetchQuestionById), in server/controllers/questions.js', err);
    });
}

