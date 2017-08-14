const scripts = [];
const contactList = [];
const defaultCampaigns = {
  all_campaigns: [],
  current_campaign: {}
};

export const SET_CAMPAIGN_FORM_SCRIPT_OPTIONS = 'SET_CAMPAIGN_FORM_SCRIPT_OPTIONS';
export const SET_CAMPAIGN_FORM_CONTACT_LIST_OPTIONS = 'SET_CAMPAIGN_FORM_CONTACT_LIST_OPTIONS';
export const SET_CAMPAIGNS = 'SET_CAMPAIGNS';
export const SET_CAMPAIGN_CURRENT = 'SET_CAMPAIGN_CURRENT';

export function scriptOptionsReducer(state = scripts, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_SCRIPT_OPTIONS:
      console.log('in Reducer****, payload is', payload);
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


export function campaignListReducer(state = defaultCampaigns, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGNS:
      return {
        ...state,
        all_campaigns: payload
      };
    case SET_CAMPAIGN_CURRENT:
      return {
        ...state,
        current_campaign: payload
      };
    default:
      return state;
  }
}
