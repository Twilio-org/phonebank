export const defaultCampaigns = {
  all_campaigns: [],
  current_campaign: {}
};

export const SET_CAMPAIGNS = 'SET_CAMPAIGNS';
export const SET_CAMPAIGN_CURRENT = 'SET_CAMPAIGN_CURRENT';
export const SET_VOLUNTEER_JOINED_CAMPAIGNS = 'SET_VOLUNTEER_JOINED_CAMPAIGNS';

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
    case SET_VOLUNTEER_JOINED_CAMPAIGNS:
      return {
        ...state,
        all_campaigns: payload
      };
    default:
      return state;
  }
}
