import Response from '../models/responses';

export default {
  saveNewResponse: (params) => {
    const { call_id, question_id, response } = params;
    return new Response({ call_id, question_id, response }).save();
  }
};
