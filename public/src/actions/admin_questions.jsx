import axios from 'axios';
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
    console.log('error fetching all questions: ', err);
  });
}
