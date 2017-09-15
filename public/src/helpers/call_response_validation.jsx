import _ from 'lodash';

export default function validateCall(values) {
  let errors = {};
  const { responses, question_total, outcome } = values;
  if (outcome !== 'ANSWERED') {
    return errors;
  } else if (responses) {
    errors.responses = [];
    for (let i = 0; i < question_total; i += 1) {
      const question = responses[i];
      if (typeof question === 'undefined' || typeof question.response === 'undefined') {
        if (question.type && question.type === 'singleselect') {
          errors.responses[i] = { _error: 'Select an option' };
        } else if (question.type && question.type === 'multiselect') {
          errors.responses[i] = { _error: 'Select at least one option' };
        } else {
          errors.responses[i] = { response: { _error: 'Response can\'t be blank' } };
        }
      } else if (question.type === 'multiselect') {
        const checkboxValues = Object.values(question.response);
        const isFilledOut = checkboxValues.reduce((value, result) => (result || value), false);
        if (!isFilledOut) {
          errors.responses[i] = { _error: 'Select at least one option' };
        }
      } else if (question.type === 'paragraph' && _.trim(question.response).length === 0) {
        errors.responses[i] = { response: { _error: 'Response can\'t be blank spaces' } };
      }
    }
    if (errors.responses.length > 0) {
      return errors;
    }
  } else if (!responses) {
    errors = { _errors: 'Please fill out questions.' };
  }
  return {};
}
