import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { PhoneBanksView } from '../components/campaign_list';

import { fetchAllCampaigns } from '../actions/campaign';


class CampaignsContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampaigns();
  }

  render() {
    return (
      <PhoneBanksView {...this.props} />
    );
  }
}

export default withRouter(
  connect(
    (state) => {
      return {
        // active_campaigns: state.active_campaigns,
        all_campaigns: state.campaigns,
        account_info: state.account_info,
        auth: state.auth
      };
    },
    { fetchAllCampaigns }
  )(CampaignsContainer)
);