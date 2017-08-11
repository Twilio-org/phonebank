const scripts = [];
const contactList = [];

export const SET_CAMPAIGN_FORM_SCRIPT_OPTIONS = 'SET_CAMPAIGN_FORM_SCRIPT_OPTIONS';
export const SET_CAMPAIGN_FORM_CONTACT_LIST_OPTIONS = 'SET_CAMPAIGN_FORM_CONTACT_LIST_OPTIONS';

export function scriptOptionsReducer(state = scripts, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_SCRIPT_OPTIONS:
      return {
        ...state,
        scriptOptions: payload
      };
    default:
      return state;
  }
}

export function contactListOptionsReducer(state = contactList, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_CONTACT_LIST_OPTIONS:
      return {
        ...state,
        contactListOptions: payload
      };
    default:
      return state;
  }
}
