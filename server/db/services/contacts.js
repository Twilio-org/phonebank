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
    const extractedParams = {
      external_id: params.externalId
    };

    return new Model(extractedParams)
      .fetch();
  },

  getContactByPhoneNumber: (params, Model) => {
    const extractedParams = {
      phone_number: params.phoneNumber
    };

    return new Model(extractedParams)
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
      do_not_call: !params.doNotCall
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
      is_invalid_number: !params.isInvalidNumber
    };
    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  }
};
