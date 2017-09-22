import axios from 'axios';
import { destroy } from 'redux-form';
import { CLEAR_CAMPAIGNS,
         SET_CAMPAIGNS,
         SET_CAMPAIGN_CURRENT,
         SET_USER_CAMPAIGN_JOIN,
         SET_CAMPAIGN_CURRENT_METRICS } from '../reducers/campaign';
import { fetchScript, fetchScriptQuestions } from './admin_scripts';

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

export function clearCampaigns() {
  return {
    type: CLEAR_CAMPAIGNS
  };
}

export function setUserCampaignJoin(response) {
  return {
    type: SET_USER_CAMPAIGN_JOIN,
    payload: !!response
  };
}

export function setCurrentCampaignMetrics(campaignMetricsObj) {
  return {
    type: SET_CAMPAIGN_CURRENT_METRICS,
    payload: campaignMetricsObj
  };
}


export function saveNewCampaign(campaignInfo, history) {
  const [{ name, title, description, script_id, contact_lists_id }, status] = campaignInfo;

  return dispatch => axios.post('/campaigns',
    {
      name,
      title,
      description,
      script_id,
      status,
      contact_lists_id
    },
    { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then((res) => {
    history.goBack();
    dispatch(destroy('CampaignPage'));
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in saving campaign into database: ${err}`,
      name: 'campaign data post request to campaign component'
    };
    throw customError;
  });
}


export function fetchCampaigns(status = '') {
  const queryParamString = status ? `?status=${status}` : status;

  return dispatch => axios.get(`/campaigns${queryParamString}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const { data: campaignsList } = campaigns;
    return dispatch(setCampaignsList(campaignsList.sort((a, b) => (a.id - b.id))));
  })
  .catch((err) => {
    console.log('error fetching all campaigns from the db: ', err);
  });
}

export function verifyVolunteerCampaign(userId, campaignId) {
  return dispatch => axios.get(`/users/${userId}/campaigns/${campaignId}`)
  .then(response => dispatch(setUserCampaignJoin(response)))
  .catch((err) => {
    console.log('no user relation to campaign, the response code is: ', err.response);
    return err.response === 404 ? dispatch(setUserCampaignJoin(undefined)) : err;
  });
}

export function fetchCampaignsByUser(userId, current_campaign) {
  return dispatch => axios.get(`/users/${userId}/campaigns`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const { data: campaignsList } = campaigns;
    if (!current_campaign || Object.getOwnPropertyNames(current_campaign).length === 0) {
      dispatch(setCampaignsList(campaignsList.sort((a, b) => (a.id - b.id))));
      return dispatch(setCurrentCampaign(campaignsList[0]));
    }
    return dispatch(setCampaignsList(campaignsList.sort((a, b) => (a.id - b.id))));
  })
  .catch((err) => {
    const customError = {
      message: `error in fetching joined campaigns from database: ${err}`,
      name: 'fetchCampaignsByUser'
    };
    throw customError;
  });
}

export function fetchCampaign(id) {
  return dispatch => axios.get(`/campaigns/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
    .then((res) => {
      const { data: campaignData } = res;
      dispatch(fetchScript(campaignData.script_id));
      dispatch(fetchScriptQuestions(campaignData.script_id));
      return dispatch(setCurrentCampaign(campaignData));
    })
    .catch((err) => {
      const customError = {
        message: `error fetching campaign action fetchCampaign: ${err}`,
        name: 'campaign info get request from view campaign component'
      };
      throw customError;
    });
}

export function fetchCampaignMetrics(id) {
  return dispatch => axios.get(`/campaigns/${id}/metrics`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
    .then((res) => {
      const { data: campaignMetricsData } = res;
      return dispatch(setCurrentCampaignMetrics(campaignMetricsData));
    })
    .catch((err) => {
      const customError = {
        message: `error fetching campaign metrics action fetchCampaignMetrics: ${err}`,
        name: 'campaign metric get request from view campaign component'
      };
      throw customError;
    });
}
