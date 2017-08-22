export const SET_CAMPAIGN_FORM_CONTACT_LIST = 'SET_CAMPAIGN_FORM_CONTACT_LIST';
export const SET_CURRENT_CONTACT_LIST = 'SET_CURRENT_CONTACT_LIST';

export const defaultContactLists = {
  contact_lists: [],
  current_contact_list: {}
};

export function adminContactListsReducer(state = defaultContactLists, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_CONTACT_LIST:
      return {
        ...state,
        contact_lists: payload
      };
    case SET_CURRENT_CONTACT_LIST:
      return {
        ...state,
        current_contact_list: payload
      };
    default:
      return state;
  }
}
