import axios from 'axios';
import { SET_CAMPAIGN_FORM_CONTACT_LIST, SET_CURRENT_CONTACT_LIST } from '../reducers/admin_contact_lists';

export function setContactListOptions(contactLists) {
  return {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactLists
  };
}

export function setCurrentContactList(contactListObj) {
  return {
    type: SET_CURRENT_CONTACT_LIST,
    payload: contactListObj
  };
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
