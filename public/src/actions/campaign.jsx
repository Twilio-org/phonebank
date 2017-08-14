import axios from 'axios';

export default function saveNewCampaign(campaignInfo, history) {
  const { name, title, description, script_id, contact_lists_id } = campaignInfo;

  return dispatch => axios.post('/campaigns',
    {
      name: name,
      title: title,
      description: description,
      status: 'draft',
      script_id: script_id,
      contact_lists_id: contact_lists_id
    },
    { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then(() => {
    history.push(`/campaign`);
  })
  .catch((err) => {
    const customError = {
      message: `error in saving campaign into database: ${err}`,
      name: 'campaign data post request to campaign component'
    };
    throw customError;
  });
} 

export function getAllCampaigns(history) {
  return dispatch => axios.get('/campaigns',
  null,
  { headers: { 'Authorization': ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    const customError = {
      message: `error fetching campaign information: ${err}`,
      name: 'campaign get request from the campaign component'
    };
    throw customError;
  });
}
