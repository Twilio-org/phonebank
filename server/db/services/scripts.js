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
  }
};
