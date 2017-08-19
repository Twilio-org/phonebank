import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_QUESTIONS, SET_QUESTION_CURRENT } from '../reducers/admin_questions';

export function setQuestionList(questionList) {
  return {
    type: SET_QUESTIONS,
    payload: questionList
  };
}

export function setCurrentQuestion(questionDataObj) {
  return {
    type: SET_QUESTION_CURRENT,
    payload: questionDataObj
  };
}

export function fetchAllQuestions() {
  return dispatch => axios.get('/questions', {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((questions) => {
    const { data: questionsList } = questions;
    return dispatch(setQuestionList(questionsList));
  })
  .catch((err) => {
    const customError = {
      message: `error fetching questions: ${err}`,
      name: 'question get request from script_form component'
    };
    throw customError;
  });
}

export default function createQuestion(questionInfo, history) {
  const { title, description, type } = questionInfo;
  // Create single string for all options
  const keys = Object.keys(questionInfo);
  const options = keys.filter(key => key.indexOf('option') >= 0);
  const responses = options.join(',');

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
