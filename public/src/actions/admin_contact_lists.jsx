import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_CAMPAIGN_FORM_CONTACT_LIST, SET_CURRENT_CONTACT_LIST, SEND_CONTACT_LIST } from '../reducers/admin_contact_lists';

export function setContactListOptions(contactLists) {
  return {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactLists
  };
}
export function sendContactList() {
  return { type: SEND_CONTACT_LIST };
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
      dispatch(setContactListOptions(contactLists.sort((a, b) => (a.id - b.id))));
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

export function createContactList(file, name, history) {
  const data = new FormData();
  data.append('name', name);
  data.append('csv', file.files[0]);
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };
  return dispatch => axios.post('/contactLists', data, config)
  .then((res) => {
    dispatch(sendContactList());
    dispatch(destroy('CreateContactList'));
    history.goBack();
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in creating new contact list to db: ${err}`,
      name: 'createContactList function error in actions/admin_contact_lists.jsx'
    };
    throw customError;
  });
}
