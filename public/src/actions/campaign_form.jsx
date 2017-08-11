import axios from 'axios';
import { SET_CAMPAIGN_FORM_SCRIPT_OPTIONS } from '../reducers/campaign';

export function setScriptOptions(scripts) {
  return {
    type: SET_CAMPAIGN_FORM_SCRIPT_OPTIONS,
    payload: scripts
  };
}

export default function fetchAllScripts() {
  return dispatch => axios.get('/scripts')
    .then((res) => {
      const scripts = res.data;
      dispatch(setScriptOptions(scripts));
      console.log('SCRIPTS ----->', scripts);
      return scripts;
    })
    .catch((err) => {
      const customError = {
        message: `error fetching questions: ${err}`,
        name: 'question get request from script_form component'
      };
      throw customError;
    });
}

