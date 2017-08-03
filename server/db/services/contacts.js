export default {
  saveNewContact: (params, Model) => {
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone_number: params.phone_number,
      email: params.email,
      external_id: params.external_id
    };

    return new Model(extractedParams).save();
  },

  getContactById: (params, Model) => {
    const { id } = params;

    return new Model({ id })
      .fetch();
  },

  getContactByExternalId: (params, Model) => {
    const extractedParams = {
      external_id: params.external_id
    };

    return new Model(extractedParams)
      .fetch();
  },

  getContactByPhoneNumber: (params, Model) => {
    const extractedParams = {
      phone_number: params.phone_number
    };

    return new Model(extractedParams)
      .fetch();
  },

  updateContactById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      phone_number: params.phone_number,
      email: params.email,
      external_id: params.external_id,
      do_not_call: params.do_not_call,
      is_invalid_number: params.is_invalid_number
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
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
