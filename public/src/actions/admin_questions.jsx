import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_QUESTIONS, SET_QUESTION_CURRENT, SET_QUESTION } from '../reducers/admin_questions';

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

export function setQuestion(questionDataObj) {
  return {
    type: SET_QUESTION,
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

export function fetchQuestion(id) {
  return dispatch => axios.get(`/questions/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const questionData = res.data;
    // TO-DO Find a better way to handle this data
    const { responses } = questionData;
    questionData.responses = responses ? questionData.responses.split(',') : '';
    return dispatch(setQuestion(questionData));
  })
  .catch((err) => {
    const customError = {
      message: `error fetching question info in questions action fetchQuestion: ${err}`,
      name: 'question info get request'
    };
    throw customError;
  });
}

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
