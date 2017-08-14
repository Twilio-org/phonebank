import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_QUESTION_INFO } from '../reducers/question_info';

export function setQuestionInfo(question) {
  return {
    type: SET_QUESTION_INFO,
    payload: question
  };
}
export default function fetchQuestion(id) {
  return dispatch => axios.get(`/questions/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const questionData = res.data;
    console.log(questionData);
    return dispatch(setQuestionInfo(questionData));
    // return questionData;
  })
  .catch((err) => {
    const customError = {
      message: `error fetching question info in questions action fetchQuestion: ${err}`,
      name: 'question info get request'
    };
    throw customError;
  });
}
export function createQuestion(questionInfo, history) {
  const { title, description } = questionInfo;
  const type = questionInfo.type.toLowerCase();
  // Create single string for all options
  const keys = Object.keys(questionInfo);
  const options = keys.filter(key => key.indexOf('option') >= 0);
  let responses = '';
  if (options.length > 0) {
    responses = options.reduce((response, option) => `${response + questionInfo[option]},`, responses);
  }
  return dispatch => axios.post('/questions', {
    title,
    description,
    type,
    responses
  })
  .then((res) => {
    history.goBack();
    dispatch(destroy('QuestionNew'));
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
