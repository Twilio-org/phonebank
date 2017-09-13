export default {
  ResponsesSerializer: (data) => {
    // Data is expected to be an array of objects with keys:
    // question_id, type, response
    const newData = data.map((question) => {
      const { question_id, type, response } = question;
      let result;
      if (question && type !== 'multiselect') {
        result = question;
      } else if (type === 'multiselect') {
        result = {
          question_id,
          type,
          response: Object.keys(response).join(',')
        };
      }
      return result;
    });
    return newData;
  }
};
