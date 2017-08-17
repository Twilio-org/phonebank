import axios from 'axios';
import { SET_CAMPAIGN_FORM_SCRIPT, SET_CAMPAIGN_FORM_CONTACT_LIST } from '../reducers/create_campaign';

export function setScriptOptions(scripts) {
  return {
    type: SET_CAMPAIGN_FORM_SCRIPT,
    payload: scripts
  };
}

export function setContactListOptions(contactLists) {
  return {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactLists
  };
}

export function fetchAllScripts() {
  return dispatch => axios.get('/scripts')
    .then((res) => {
      const scripts = res.data;
      dispatch(setScriptOptions(scripts));
      return scripts;
    })
    .catch((err) => {
      const customError = {
        message: `error fetching scripts: ${err}`,
        name: 'scripts get request from campaignPage component'
      };
      throw customError;
    });
}

export function fetchAllContactLists() {
  return dispatch => axios.get('/contactLists')
    .then((res) => {
      const contactLists = res.data;
      dispatch(setContactListOptions(contactLists));
      return contactLists;
    })
    .catch((err) => {
      const customError = {
        message: `error fetching contact lists: ${err}`,
        name: 'contact lists get request from campaignPage component'
      };
      throw customError;
    });
}
