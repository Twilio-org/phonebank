import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import TableRow from './campaign_table_row';
import AdminDashboardButtonGroup from './admin_nav_btn_group';
import AdminBanner from './admin_welcome_banner';
import CreateNewButton from './admin_createNew_btn';

export default class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchAllCampaigns();
  }

  render() {
    const { all_campaigns, account_info: { last_name, first_name }, history } = this.props;
    const thisPage = 'Campaign';
    return (
      <div>
        <AdminBanner
          first_name={first_name}
          last_name={last_name}
          history={history}
          page={thisPage}
        />
        <div>
          <AdminDashboardButtonGroup history={this.props.history} />
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Script Id</th>
              <th>Contact List</th>
              <th>Date Created</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {all_campaigns.length ?
              all_campaigns.map(campaign =>
                (<TableRow
                  campaign={campaign}
                  handleEditClick={this.props.setCurrentCampaign}
                  key={campaign.id}
                />)
              ) :
              (<tr />)
            }
          </tbody>
        </Table>
        <div>
          <CreateNewButton {...this.props} page={thisPage} />
        </div>
      </div>
    );
  }
}

// admin/campaign/new (create new campaign redirect)
