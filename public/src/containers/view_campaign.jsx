import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampaign } from '../actions/campaign';
import ViewCampaign from '../components/campaign/view_campaign';


function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchCampaign })(ViewCampaign)
);
