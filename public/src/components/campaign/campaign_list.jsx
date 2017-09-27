import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';
import Footer from '../footer';

const { campaigns: campaignHeaders } = tableHeaders;

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.volunteerJoinCampaignClick = this.volunteerJoinCampaignClick.bind(this);
  }
  componentDidMount() {
    // Note: this was a fix for the demo, this should be added
    // to list of things to carry over
    // const { is_admin: isAdmin } = this.props.account_info;
    const isAdmin = localStorage.getItem('permissions');
    const status = isAdmin ? '' : 'active';
    this.props.fetchCampaigns(status);
  }

  volunteerJoinCampaignClick(id, historyObj, campaign) {
    const { setCurrentCampaign, addCampaignToUser } = this.props;
    setCurrentCampaign(campaign);
    addCampaignToUser(id, campaign.id, historyObj);
  }

  render() {
    const {
      account_info,
      all_campaigns,
      auth,
      history,
      updateCampaignStatus
    } = this.props;
    const thisPage = 'Campaign';
    const { admin_campaigns, volunteer_campaigns } = buttons_obj;
    const { redirect_path } = campaignHeaders;
    return (
      <div>
        {
          all_campaigns ? (
            <TableListView
              item_collection={all_campaigns}
              account_info={account_info}
              auth={auth}
              history={history}
              button_collection={account_info.is_admin ?
                                   admin_campaigns :
                                   volunteer_campaigns}
              componentClickHandler={account_info.is_admin ?
                                      updateCampaignStatus :
                                      this.volunteerJoinCampaignClick}
              thisPage={thisPage}
              tableHeaders={campaignHeaders}
              newPath={redirect_path}
            />
        ) : null
      }
        {account_info.is_admin ? '' : <Footer /> }
      </div>
    );
  }
}
