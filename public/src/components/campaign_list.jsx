
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import TableRow from './campaign_table_row';

export default class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchAllCampaigns();
  }

  render() {
    const { all_campaigns, account_info: { last_name, first_name } } = this.props;
    return (
      <div>
        <h2>Welcome, {first_name} {last_name} to the Admin Campaigns Dashboard!</h2>
        <Button bsSize="xsmall">Create New Phone Bank</Button>

        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Script Id</th>
              <th>Date Created</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {!!all_campaigns.length ?
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
      </div>
    );
  }
}

