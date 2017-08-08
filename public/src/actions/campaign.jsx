<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> mostly finished with the landing page refactor for admin's
// import axios from 'axios';
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

// export function fetchAllCampaigns() {
//   return dispatch => axios.get('/campaigns', {
//     headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
//   })
//   .then((campaigns) => {
//     const campaignsObj = mapAndFilter(campaigns);
//     return dispatch(setCampaignsList(campaignsObj));
//   })
//   .catch((err) => {
//     console.log('error fetching all campaigns from the db: ', err);
//   });
// }

const campaignArray = [
  {
    name: 'hatch',
    title: 'meow',
    description: 'meow meow',
    status: 'active',
    script_id: 2,
    created_at: '1234-2345',
    id: 1
  },
  {
    name: 'hatch',
    title: 'meow',
    description: 'meow meow',
    status: 'active',
    script_id: 1,
    created_at: '1234-2345',
    id: 2
  },
  {
    name: 'andi',
    title: 'meow',
    description: 'meow meow',
    status: 'active',
    script_id: 8,
    created_at: '1234-2345',
    id: 7
  },
  {
    name: 'hatch',
    title: 'meow',
    description: 'meow meow',
    status: 'active',
    script_id: 6,
    created_at: '1234-2345',
    id: 4
  }
];

export function fetchAllCampaigns() {
  return dispatch => dispatch(setCampaignsList(campaignArray));
}
