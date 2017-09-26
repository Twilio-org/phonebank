export const defaultCampaigns = {
  all_campaigns: [],
  current_campaign: {},
  current_campaign_metrics: {},
  has_user_joined_campaign: false
};

export const CLEAR_CAMPAIGNS = 'CLEAR_CAMPAIGNS';
export const SET_CAMPAIGNS = 'SET_CAMPAIGNS';
export const SET_CAMPAIGN_CURRENT = 'SET_CAMPAIGN_CURRENT';
export const SET_CAMPAIGN_CURRENT_METRICS = 'SET_CAMPAIGN_CURRENT_METRICS';
export const SET_USER_CAMPAIGN_JOIN = 'SET_USER_CAMPAIGN_JOIN';
export const CLEAR_CAMPAIGN_METRICS = 'CLEAR_CAMPAIGN_METRICS';

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
        all_campaigns: defaultCampaigns.all_campaigns
      };
    case SET_CAMPAIGN_CURRENT_METRICS:
      return {
        ...state,
        current_campaign_metrics: payload
      };
    case CLEAR_CAMPAIGN_METRICS:
      return {
        ...state,
        current_campaign_metrics: defaultCampaigns.current_campaign_metrics
      };
    default:
      return state;
  }
}
