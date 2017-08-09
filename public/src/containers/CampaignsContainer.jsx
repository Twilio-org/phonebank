import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CampaignList from '../components/campaign_list';

import { fetchAllCampaigns, setCurrentCampaign } from '../actions/campaign';


class CampaignsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampaigns();
  }

  render() {
    const { first_name, last_name } = this.props.account_info;
    return (
      <div>
        <h3>Welcome {first_name} {last_name} to your Campaign Dashboard!</h3>
        <div>
          <CampaignList {...this.props} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_campaign: state.campaigns.current_campaign,
    all_campaigns: state.campaigns.all_campaigns,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllCampaigns, setCurrentCampaign })(CampaignsContainer)
);
