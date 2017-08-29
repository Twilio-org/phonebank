export const SET_VOLUNTEER_JOINED_CAMPAIGNS = 'SET_VOLUNTEER_JOINED_CAMPAIGNS';
export const SET_VOLUNTEER_CURRENT_CAMPAIGN = 'SET_VOLUNTEER_CURRENT_CAMPAIGN';

export const defaultVolunteerCampaigns = {
  current_campaign: {},
  joined_campaigns: []
};

export function volunteerCampaignsReducer(state = defaultVolunteerCampaigns, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_VOLUNTEER_JOINED_CAMPAIGNS:
      return {
        ...state,
        joined_campaigns: payload
      };
    case SET_VOLUNTEER_CURRENT_CAMPAIGN:
      return {
        ...state,
        current_campaign: payload
      };
    default:
      return state;
  }
}
