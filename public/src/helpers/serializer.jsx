export default {
  ResponsesSerializer: (data) => {
    const newData = data.map((question) => {
      const { question_id, type, response } = question;
      let result;
      if (question && type !== 'multiselect') {
        result = question;
      } else if (type === 'multiselect') {
        const selected = Object.keys(response).filter(option => response[option]).join(',');
        result = {
          question_id,
          type,
          response: selected
        };
      }
      return result;
    });
    return newData;
  }
};
