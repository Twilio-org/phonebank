import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_QUESTION_INFO } from '../reducers/question_info';

export function setQuestionInfo(question) {
  return {
    type: SET_QUESTION_INFO,
    payload: question
  };
}

export function createQuestion(questionInfo, history) {
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

export function fetchQuestion(id) {
  return dispatch => axios.get(`/questions/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const questionData = res.data;
    // TO-DO Find a better way to handle this data
    questionData.responses = questionData.responses.split(',');
    return dispatch(setQuestionInfo(questionData));
  })
  .catch((err) => {
    const customError = {
      message: `error fetching question info in questions action fetchQuestion: ${err}`,
      name: 'question info get request'
    };
    throw customError;
  });
}
