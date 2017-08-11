import axios from 'axios';
import { SET_CAMPAIGNS, SET_CAMPAIGN_CURRENT } from '../reducers/campaign';

export function setCampaignsList(campaignsList) {
  return {
    type: SET_CAMPAIGNS,
    payload: campaignsList
  };
}

export function setCurrentCampaign(campaignDataObj) {
  return {
    type: SET_CAMPAIGN_CURRENT,
    payload: campaignDataObj
  };
}

export function fetchAllCampaigns() {
  return dispatch => axios.get('/campaigns', {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const { data: campaignsList } = campaigns;
    return dispatch(setCampaignsList(campaignsList));
  })
  .catch((err) => {
    console.log('error fetching all campaigns from the db: ', err);
  });
}
