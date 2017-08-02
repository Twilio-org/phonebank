export default {
  saveNewContact: (params, Model) => {
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      phone_number: params.phoneNumber,
      email: params.email,
      external_id: params.externalId
    };

    return new Model(extractedParams).save();
  },

  getContactByExternalId: (params, Model) => {
    const { external_id } = params;

    return new Model({ external_id })
      .fetch();
  },

  getContactByPhoneNumber: (params, Model) => {
    const { phone_number } = params;

    return new Model({ phone_number })
      .fetch();
  },

  updateContactById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      phone_number: params.phoneNumber,
      email: params.email,
      external_id: params.externalId
      // do_not_call: params.doNotCall,
      // is_invalid_number: params.isInvalidNumber
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },
  updateContactDoNotCallById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      do_not_call: !params.do_not_call
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },
  updateContactInvalidNumberById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      is_invalid_number: !params.is_invalid_number
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  }
};
