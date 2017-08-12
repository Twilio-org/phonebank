import axios from 'axios';
import { SET_SCRIPT_INFO } from '../reducers/script';

export function setScriptInfo(script) {
  return {
    type: SET_SCRIPT_INFO,
    payload: script
  };
}

export function fetchScript(id) {
  return dispatch => axios.get(`/scripts/${id}`)
    .then((res) => {
      const scriptData = res.data;
      dispatch(setScriptInfo(scriptData));
      return scriptData;
    })
    .catch((err) => {
      const customError = {
        message: `error fetching script info in script action fetchScript: ${err}`,
        name: 'script info get request from script component'
      };
      throw customError;
    });
}
