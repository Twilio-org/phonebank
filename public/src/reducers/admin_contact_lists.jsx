export const SET_CAMPAIGN_FORM_CONTACT_LIST = 'SET_CAMPAIGN_FORM_CONTACT_LIST';

export const defaultContactLists = {
  contact_lists: []
};

export function adminContactListsReducer(state = defaultContactLists, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_CONTACT_LIST:
      return {
        ...state,
        contact_lists: payload
      };
    default:
      return state;
  }
}
