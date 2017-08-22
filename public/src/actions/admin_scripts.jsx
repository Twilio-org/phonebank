import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_SCRIPTS, SET_SCRIPT_CURRENT, SET_SCRIPT_QUESTIONS } from '../reducers/admin_scripts';

export function setScriptsList(scriptList) {
  return {
    type: SET_SCRIPTS,
    payload: scriptList
  };
}

export function setCurrentScript(scriptDataObj) {
  return {
    type: SET_SCRIPT_CURRENT,
    payload: scriptDataObj
  };
}

export function setScriptQuestions(questions) {
  return {
    type: SET_SCRIPT_QUESTIONS,
    payload: questions
  };
}

export function fetchAllScripts() {
  return dispatch => axios.get('/scripts', {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((scripts) => {
    const { data: scriptList } = scripts;
    return dispatch(setScriptsList(scriptList));
  })
  .catch((err) => {
    console.log('error fetching all scripts: ', err);
  });
}

export function postScript(script, questions, history) {
  const { name, description, body } = script;
  return dispatch => axios.post('/scripts', {
    name,
    body,
    description
  })
    .then((res) => {
      const script_id = res.data.id;
      questions.forEach((question) => {
        axios.post(`/scripts/${script_id}/scriptQuestions`, {
          question_id: question.question_id,
          sequence_number: question.sequence_number
        });
      });
    })
    .then(() => {
      history.goBack();
      dispatch(destroy('ScriptForm'));
    })
    .catch((err) => {
      const customError = {
        message: `error in posting new script to the db: ${err}`,
        name: 'postNewScript function error in script_form.jsx'
      };
      throw customError;
    });
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
