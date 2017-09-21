import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampaign, fetchCampaignMetrics } from '../actions/campaign';
import { fetchScript } from '../actions/admin_scripts';
import ViewCampaign from '../components/campaign/view_campaign';


function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign,
    current_script: state.admin_scripts.current_script,
    current_campaign_metrics: state.admin_campaigns.current_campaign_metrics
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchCampaign, fetchScript, fetchCampaignMetrics })(ViewCampaign)
);
