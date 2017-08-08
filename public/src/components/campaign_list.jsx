
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import _ from 'lodash';

import TableRow from './components/campaign_table_row';

export class PhoneBanksView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <Button>Create New Phone Bank</Button>
    </div>

    <Table responsive>
      <thead>
        <th>Name</th>
        <th>Status</th>
        <th>Created Date</th>
      </thead>

      <tbody>
        {
          for(let key in props.all_campaigns) {
            (<TableRow campaign={all_campaigns[key]} key={key} />)
          }
        }
      </tbody>
    </Table>
  }
}