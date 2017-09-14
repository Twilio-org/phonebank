export default function validateCall(values) {
  let errors = {};
  const { responses, question_total, outcome } = values;
  if (outcome !== 'ANSWERED') {
    return errors;
  } else if (responses) {
    for (let i = 0; i < question_total; i += 1) {
      const question = responses[i];
      if (typeof question === 'undefined' || typeof question.response === 'undefined') {
        errors.responses = [];
        errors.responses[i] = { response: { _error: 'Response can\'t be blank' } };
      } else if (question.type === 'multiselect') {
        const checkboxValues = Object.values(question.response);
        const isFilledOut = checkboxValues.reduce((value, result) => (result || value), false);
        if (!isFilledOut) {
          errors.responses = [];
          errors.responses[i] = { _error: 'Select at least one option' };
        }
      }
    }
  } else if (!responses) {
    errors = { _errors: 'Please fill out questions.' };
  }
  return errors;
}
