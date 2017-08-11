import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CampaignList from '../components/campaign_list';

import { fetchAllCampaigns, setCurrentCampaign } from '../actions/campaign';

function mapStateToProps(state) {
  return {
    current_campaign: state.campaigns.current_campaign,
    all_campaigns: state.campaigns.all_campaigns,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllCampaigns, setCurrentCampaign })(CampaignList)
);
