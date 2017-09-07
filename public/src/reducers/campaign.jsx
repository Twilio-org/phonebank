export const defaultCampaigns = {
  all_campaigns: [],
  current_campaign: {},
  has_user_joined_campaign: false
};

export const CLEAR_CAMPAIGNS = 'CLEAR_CAMPAIGNS';
export const SET_CAMPAIGNS = 'SET_CAMPAIGNS';
export const SET_CAMPAIGN_CURRENT = 'SET_CAMPAIGN_CURRENT';
export const SET_USER_CAMPAIGN_JOIN = 'SET_USER_CAMPAIGN_JOIN';

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
    case SET_USER_CAMPAIGN_JOIN:
      return {
        ...state,
        has_user_joined_campaign: payload
      };
    case CLEAR_CAMPAIGNS:
      return {
        ...state,
        all_campaigns: undefined
      };
    default:
      return state;
  }
}
