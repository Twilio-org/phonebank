import Contact from '../models/contacts';

export default {
  saveNewContact: (params) => {
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone_number: params.phone_number,
      email: params.email,
      external_id: params.external_id
    };

    return new Contact(extractedParams).save();
  },

  getContactById: (params) => {
    const { id } = params;

    return new Contact({ id })
      .fetch();
  },

  getContactByExternalId: (params) => {
    const extractedParams = {
      external_id: params.external_id
    };

    return new Contact(extractedParams)
      .fetch();
  },

  getContactByPhoneNumber: (params) => {
    const extractedParams = {
      phone_number: params.phone_number
    };

    return new Contact(extractedParams)
      .fetch();
  },

  updateContactById: (params) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone_number: params.phone_number,
      email: params.email,
      external_id: params.external_id
    };
    return new Contact({ id })
      .save(extractedParams, {
        patch: true
      });
  },

  getContactByPhoneNumberAndFirstName: (params) => {
    const extractedParams = {
      first_name: params.first_name,
      phone_number: params.phone_number
    };

    return new Contact()
        .where(extractedParams)
        .fetch();
  }
  // updateContactDoNotCallById: (params, Model) => {
  //   const { id } = params;
  //   const extractedParams = {
  //     do_not_call: params.do_not_call
  //   };
  //   return new Model()
  //     .where({ id })
  //     .save(extractedParams, {
  //       method: 'update'
  //     });
  // },
  // updateContactInvalidNumberById: (params, Model) => {
  //   const { id } = params;
  //   const extractedParams = {
  //     is_invalid_number: params.is_invalid_number
  //   };
  //   return new Model()
  //     .where({ id })
  //     .save(extractedParams, {
  //       method: 'update'
  //     });
  // }
};
