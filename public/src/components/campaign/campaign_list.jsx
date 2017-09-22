import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';

const { campaigns: campaignHeaders } = tableHeaders;

export default class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.volunteerJoinCampaignClick = this.volunteerJoinCampaignClick.bind(this);
  }
  componentDidMount() {
    const status = this.props.account_info.is_admin ? '' : 'active';
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
      </div>
    );
  }
}
