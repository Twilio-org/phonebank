import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JoinedCampaigns from '../components/campaign/joined_campaigns';
import { checkTwilioCon } from '../actions/calls';
import { clearCampaigns, fetchCampaignsByUser, setCurrentCampaign } from '../actions/campaign';

function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign,
    joined_campaigns: state.admin_campaigns.all_campaigns,
    account_info: state.account_info,
    auth: state.auth,
    call_volunteer_active: state.calls.call_volunteer_active
  };
}
const JoinedCampaignsContainer = withRouter(
  connect(mapStateToProps,
    { fetchCampaignsByUser,
      setCurrentCampaign,
      clearCampaigns,
      checkTwilioCon })(JoinedCampaigns)
);
export default JoinedCampaignsContainer;
