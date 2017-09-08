import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JoinedCampaigns from '../components/campaign/joined_campaigns';
import { setVolunteerActive } from '../actions/calls';
import { clearCampaigns, fetchCampaignsByUser, setCurrentCampaign } from '../actions/campaign';

function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign,
    joined_campaigns: state.admin_campaigns.all_campaigns,
    account_info: state.account_info,
    auth: state.auth
  };
}
const JoinedCampaignsContainer = withRouter(
  connect(mapStateToProps,
    { fetchCampaignsByUser,
      setCurrentCampaign,
      setVolunteerActive,
      clearCampaigns })(JoinedCampaigns)
);
export default JoinedCampaignsContainer;
