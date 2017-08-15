const defaultScriptsContactsForm = {
  scripts: [],
  contacts: []
};

export const SET_CAMPAIGN_FORM_SCRIPT = 'SET_CAMPAIGN_FORM_SCRIPT';
export const SET_CAMPAIGN_FORM_CONTACT_LIST = 'SET_CAMPAIGN_FORM_CONTACT_LIST';

export function campaignFormReducer(state = defaultScriptsContactsForm, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_SCRIPT:
      return {
        ...state,
        scripts: payload
      };
    case SET_CAMPAIGN_FORM_CONTACT_LIST:
      return {
        ...state,
        contacts: payload
      };
    default:
      return state;
  }
}
