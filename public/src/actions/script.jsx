import axios from 'axios';
import { SET_SCRIPT_QUESTIONS } from '../reducers/script';
import { setCurrentScript } from './admin_scripts';

export function setScriptQuestions(questions) {
  return {
    type: SET_SCRIPT_QUESTIONS,
    payload: questions
  };
}

export function fetchScript(id) {
  return dispatch => axios.get(`/scripts/${id}`)
    .then((res) => {
      const { data: scriptData } = res;
      return dispatch(setCurrentScript(scriptData));
    })
    .catch((err) => {
      const customError = {
        message: `error fetching script info in script action fetchScript: ${err}`,
        name: 'script info get request from script component'
      };
      throw customError;
    });
}

export function fetchScriptQuestions(id) {
  return dispatch => axios.get(`/scripts/${id}/scriptQuestions/`)
    .then((res) => {
      const { data: scriptQuestions } = res;
      return dispatch(setScriptQuestions(scriptQuestions));
    })
    .catch((err) => {
      const customError = {
        message: `error fetching script questions in script action fetchScriptQuestions: ${err}`,
        name: 'script questions get request from script component'
      };
      throw customError;
    });
}
