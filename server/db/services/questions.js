export default {
  saveNewQuestion: (params, Model) => {
    // TODO: will update with created_by when we establish relation to users
    const { title, description, type, responses } = params;

    return new Model({ title, description, type, responses }).save();
  },
  getAllQuestions: Model => Model.forge().orderBy('updated_at', 'DESC').fetchAll(),
  getQuestionById: (params, Model) => {
    const { id } = params;
    return new Model({ id }).fetch();
  }
};
