export default {
  saveNewContactList: (params, Model) => {
    const extractedParams = {
      name: params.name
    };
    return new Model(extractedParams).save();
  },
  addContactToContactList: (params, Model) => {
    const { id, contact_id } = params;
    return new Model({ id })
      .contacts().attach({ contact_id, contact_list_id: id });
  },
  getAllContactLists: Model => new Model()
    .orderBy('name', 'DESC').fetchAll(),
  getContactsInContactListById: (params, Model) => {
    const { id } = params;
    return new Model({ id })
      .contacts().fetch();
  },
  getContactListById: (params, Model) => {
    const { id } = params;

    return new Model({ id })
      .fetch();
  },
  getContactListByName: (params, Model) => {
    const { name } = params;

    return new Model({ name })
      .fetch();
  },
  updateContactListById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      name: params.name
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  }
};
