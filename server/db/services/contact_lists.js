import ContactList from '../models/contact_lists';

export default {
  saveNewContactList: (params) => {
    const extractedParams = {
      name: params.name
    };
    return new ContactList(extractedParams).save();
  },
  addContactToContactList: (params) => {
    const { id, contact_id } = params;
    return new ContactList({ id })
      .contacts().attach({ contact_id, contact_list_id: id });
  },
  getAllContactLists: () => new ContactList()
    .orderBy('name', 'DESC').fetchAll(),
  getContactsInContactListById: (params) => {
    const { id } = params;
    return new ContactList({ id })
      .contacts().fetch();
  },
  getContactListById: (params) => {
    const { id } = params;

    return new ContactList({ id })
      .fetch();
  },
  getContactListByName: (params) => {
    const { name } = params;

    return new ContactList({ name })
      .fetch();
  },
  updateContactListById: (params) => {
    const { id } = params;
    const extractedParams = {
      name: params.name
    };
    return new ContactList()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  }
};
