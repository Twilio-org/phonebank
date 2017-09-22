import Question from '../models/questions';

export default {
  saveNewQuestion: (params) => {
    // TODO: will update with created_by when we establish relation to users
    const { title, description, type, responses } = params;

    return new Question({ title, description, type, responses }).save();
  },
  getAllQuestions: () => Question.forge().orderBy('id', 'DESC').fetchAll(),
  getQuestionById: (params) => {
    const { id } = params;
    return new Question({ id }).fetch();
  }
};
