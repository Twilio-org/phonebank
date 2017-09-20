import Response from '../models/responses';

export default {
  saveNewResponse: (params) => {
    const { call_id, question_id, response } = params;
    return new Response({ call_id, question_id, response }).save();
  },
  fetchResponsesByQuestionId: (params) => {
    const { question_id } = params;
    return new Response()
      .where({ question_id })
      .orderBy('id', 'ASC')
      .fetchAll();
  },
  fetchResponesByQuestionCallId: (params) => {
    const { calls_array, question_id } = params;
    return new Response().query((q) => {
      q.from('responses')
        .select('response', 'question_id', 'call_id')
        .leftJoin('calls', 'responses.call_id', 'calls.id')
        .where({ question_id })
        .whereIn('call_id', calls_array);
    })
    .fetchAll();
  }
};
