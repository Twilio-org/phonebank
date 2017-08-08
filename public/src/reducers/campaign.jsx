export const SET_CAMPAIGNS_LIST = 'SET_CAMPAIGNS_LIST';

export function campaignListReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGNS_LIST:
      return {
        ...state,
        all_campaigns: payload.all_campaigns
      };
    default:
      return state;
  }
}

