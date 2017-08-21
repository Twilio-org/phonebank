import axios from 'axios';
import { destroy } from 'redux-form';

export default function createQuestion(questionInfo, history) {
  let { responses } = questionInfo;
  const { title, description, type } = questionInfo;
  // TO-DO: Find a better way to handle question response data
  responses = responses ? Object.keys(responses).map(key => responses[key]).join(',') : '';

  return dispatch => axios.post('/questions', {
    title,
    description,
    type,
    responses
  })
  .then((res) => {
    history.goBack();
    dispatch(destroy('CreateQuestion'));
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in creating new questions to db: ${err}`,
      name: 'createQuestion function error in actions/questions.jsx'
    };
    throw customError;
  });
}
