export default {
  ResponsesSerializer: (data) => {
    // Data is expected to be an array of objects with keys:
    // question_id, type, response
    const newData = data.map((question) => {
      const { question_id, type, response } = question;
      if (type === 'multiselect') {
        return {
          question_id,
          type,
          response: Object.keys(response).join(',')
        };
      }
      return question;
    });
    return newData;
  }
};
