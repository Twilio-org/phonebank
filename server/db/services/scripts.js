import Script from '../models/scripts';

export default {
  saveNewScript: (params) => {
    const extractedParams = {
      name: params.name,
      body: params.body,
      description: params.description
    };

    return new Script(extractedParams).save();
  },

  getAllScripts: () => Script.forge()
    .orderBy('updated_at', 'DESC').fetchAll(),

  getScriptById: (params) => {
    const { id } = params;

    return new Script({ id })
      .fetch();
  },

  updateScriptById: (params) => {
    const { id } = params;
    const extractedParams = {
      name: params.name,
      body: params.body,
      description: params.description
    };
    return new Script()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deleteScriptById: (params) => {
    const { id } = params;

    return new Script({ id })
      .destroy()
      .then(model => model);
  },

  addQuestionToScript: (params) => {
    const { question_id, id, sequence_number } = params;

    return new Script({ id })

    .questions().attach({ script_id: id, question_id, sequence_number });
  },

  getQuestionsByScriptId: (params) => {
    const { id } = params;

    return new Script().query((q) => {
      q.from('questions')
        .select('*')
        .leftJoin('questions_scripts', 'questions.id', 'questions_scripts.question_id')
        .where({ script_id: id })
        .orderByRaw('sequence_number asc');
    })
    .fetchAll({});
  }
};
