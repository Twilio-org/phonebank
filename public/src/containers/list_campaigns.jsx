import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CampaignList from '../components/campaign/campaign_list';

import { fetchCampaigns, setCurrentCampaign } from '../actions/campaign';
import { addCampaignToUser } from '../actions/users';

function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign,
    all_campaigns: state.admin_campaigns.all_campaigns,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCampaigns,
      setCurrentCampaign,
      addCampaignToUser }
    )(CampaignList)
);
