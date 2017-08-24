import axios from 'axios';
import { destroy } from 'redux-form';
import FormData from 'form-data';
import { SET_CAMPAIGN_FORM_CONTACT_LIST } from '../reducers/admin_contact_lists';

export function setContactListOptions(contactLists) {
  return {
    type: SET_CAMPAIGN_FORM_CONTACT_LIST,
    payload: contactLists
  };
}
export function createCSVContactList() {
  return { type: 'CONTACT_LIST_CREATION_SUCCESSFUL' };
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

export function createContactList(file, contactList, history) {
  // console.log(file.files[0]);
  // var reader = new FileReader();
  // reader.onload = function shipOff(e) {
    // const result = e.target.result;
  const data = new FormData();
  data.append('name', contactList.name);
  data.append('csv', file.files[0]);
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };
  return dispatch => axios.post('/contactLists', data, config)
  .then((res) => {
    dispatch(createCSVContactList());
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
  // reader.readAsText(file.files[0], 'UTF-8');

  // return { type: 'CSV-COMPLETE' }; // needs a reducer


  // return dispatch => axios.post('/contactLists', data, config)
  // .then((res) => {
  //   dispatch(destroy('CreateContactList'));
  //   history.goBack();
  //   return res;
  // })
// }
