import React, { Component } from 'react';

import buttons_obj from '../common/admin_button_objs';
import TableListView from '../common/admin_list_view';
import tableHeaders from '../common/list_table_headers';

const { campaigns: campaignHeaders } = tableHeaders;

export default class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchAllCampaigns();
  }

  render() {
    const { all_campaigns, account_info, history } = this.props;
    const thisPage = 'Campaign';
    const { campaigns } = buttons_obj;
    const { redirect_path } = campaignHeaders;

    return (
      <div>
        {
          all_campaigns ? (
            <TableListView
              item_collection={all_campaigns}
              account_info={account_info}
              history={history}
              button_collection={campaigns}
              setCurrentItem={this.props.setCurrentQuestion}
              thisPage={thisPage}
              tableHeaders={campaignHeaders}
              newPath={redirect_path}
              {...this.props}
            />
        ) : null
      }
      </div>

    );
  }
}

