import axios from 'axios';
import { SET_CAMPAIGNS_LIST } from '../reducers/campaign';

function mapAndFilter(campaigns) {
  const obj = {};
  campaigns.forEach((campaign) => {
    const { name, title, description, status, script_id, created_at, id } = campaign;
    obj[id] = { name, title, description, status, script_id, created_at, id };
  });
  return obj;
}

export function setCampaignsList(campaignsList) {
  return {
    type: SET_CAMPAIGNS_LIST,
    payload: campaignsList
  };
}

export function fetchAllCampaigns() {
  return dispatch => axios.get('/campaigns', {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const campaignsObj = mapAndFilter(campaigns);
    return dispatch(setCampaignsList(campaignsObj));
  })
  .catch((err) => {
    console.log('error fetching all campaigns from the db: ', err);
  });
}
