import axios from 'axios';
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
    console.log(scripts, '##### succesfully grabed scrpts')
    const { data: scriptList } = scripts;
    return dispatch(setScriptsList(scriptList));
  })
  .catch((err) => {
    console.log('error fetching all scripts: ', err);
  });
}
