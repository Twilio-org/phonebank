import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_SCRIPTS, SET_SCRIPT_CURRENT } from '../reducers/admin_scripts';

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
