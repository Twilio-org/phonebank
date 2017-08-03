export default {
  saveNewQuestion: (params, Model) => {
    // TODO: will update with created_by when we establish relation to users
    const { title, description, type, responses } = params;

    return new Model({ title, description, type, responses }).save();
  },
  getAllQuestions: Model => Model.forge().orderBy('id', 'DESC').fetchAll(),
  getQuestionById: (params, Model) => {
    const { id } = params;
    return new Model({ id }).fetch();
  }
  // ,
  // getQuestionByTitle: (params, Model) => {
  //   // TODO: I think title should be unique, if we decide
  //   // this is not the case this will need a small refactor
  //   const { title } = params;

  //   return new Model({ title }).fetch();
  // },
  // getQuestionByCreationDate: (params, Model) => {
  //   const { created_at } = params;
  //   return new Model({ created_at }).fetch();
  // },

  // getQuestionByEditDate: (params, Model) => {
  //   const { updated_at } = params;
  //   return new Model({ updated_at }).fetch();
  // }
  // getQuestionCreatedBy: (params, Model) => {
    // TODO: wait for user relations
  // }
};
