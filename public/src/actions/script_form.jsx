import axios from 'axios';
import { SET_SCRIPT_FORM_QUESTION_OPTIONS } from '../reducers/script_form';

export function setQuestionOptions(questions) {
  return {
    type: SET_SCRIPT_FORM_QUESTION_OPTIONS,
    payload: questions
  };
}

export function fetchAllQuestions() {
  return dispatch => axios.get('/questions')
    .then((res) => {
      const questions = res.data;
      dispatch(setQuestionOptions(questions));
      return questions;
    })
    .catch((err) => {
      const customError = {
        message: `error fetching questions: ${error}`,
        name: 'question get request from script_form component'
      };
      throw customError;
    });
}

export function postNewScript(script, questions, history) {
  const { name, description, body } = script;
  return dispatch => axios.post('/scripts', {
    name,
    body,
    description
  })
    .then((res) => {
      history.push('/campaigns');
    })
    .catch((err) => {
      const customError = {
        message: `error in posting new script to the db: ${err}`,
        name: 'postNewScript function error in script_form.jsx'
      };
      throw customError;
    });
}
