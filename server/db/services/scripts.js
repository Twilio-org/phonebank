export default {
  saveNewScript: (params, Model) => {
    const extractedParams = {
      name: params.name,
      body: params.body,
      description: params.description
    };

    return new Model(extractedParams).save();
  },

  getAllScripts: Model => Model.forge()
    .orderBy('updated_at', 'DESC').fetchAll(),

  getScriptById: (params, Model) => {
    const { id } = params;

    return new Model({ id })
      .fetch();
  },

  updateScriptById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      name: params.name,
      body: params.body,
      description: params.description
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deleteScriptById: (params, Model) => {
    const { id } = params;

    return new Model({ id })
      .destroy()
      .then(model => model);
  },

  addQuestionToScript: (params, Model) => {
    const { question_id, id, sequence_number } = params;

    return new Model({ id })

    .questions().attach({ script_id: id, question_id, sequence_number });
  },

  getQuestionsByScriptId: (params, Model) => {
    const { id } = params;

    return new Model().query((q) => {
      q.from('questions')
        .select('*')
        .leftJoin('questions_scripts', 'questions.id', 'questions_scripts.question_id')
        .where({ script_id: id })
        .orderByRaw('sequence_number asc');
    })
    .fetchAll({});
  }
};
