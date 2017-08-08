
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
// import _ from 'lodash';

import TableRow from './campaign_table_row';

export default class CampaignList extends Component {

  render() {
    const { all_campaigns } = this.props;
    return (
      <div>
        <Button>Create New Phone Bank</Button>

        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Script Id</th>
              <th>Date Created</th>
            </tr>
          </thead>

          <tbody>
            {!!all_campaigns ?
              all_campaigns.map(campaign =>
                (<TableRow
                  campaign={campaign}
                  handleEditClick={this.props.setCurrentCampaign}
                  key={campaign.id}
                />)
              ) :
              ''
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
