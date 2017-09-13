export default function validateCall(values) {
  const errors = {};
  const { responses } = values;
  if (responses) {
    errors.responses = [];
    responses.forEach((question, i) => {
      if (typeof question === 'undefined' || typeof question.response === 'undefined') {
        errors.responses[i] = { response: 'Response can\'t be blank' };
      } else if (question.type === 'multiselect') {
        const checkboxValues = Object.values(question.response);
        const isFilledOut = checkboxValues.reduce((value, result) => (result || value), false);
        if (!isFilledOut) {
          errors.responses[i] = { response: 'Select at least one option' };
        }
      }
    });
  } else if (!responses) {
    errors['_error'] = 'Please fill out questions.';
  }
  console.log('VALIDATION ERRORS!!', errors);
  return errors;
}
