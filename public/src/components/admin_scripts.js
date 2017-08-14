import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ScriptsTableRow from './scripts_table_row';

export default class ScriptsList extends Component {
  componentDidMount() {
    this.props.fetchAllScripts();
  }

  render() {
    console.log(this.props, '&&&&&&&')
    const { all_scripts, account_info: { last_name, first_name } } = this.props;
    // console.log(all_scripts, '%%%%%%%%' )

    return (
      <div>
        <h2>Welcome, {first_name} {last_name} to the Admin Campaigns Dashboard!</h2>
        <Button bsSize="xsmall">Create New Phone Bank</Button>
        <div>
          <Link to="/campaigns">View All Campaigns</Link>
          <Link to="/admin_questions">View All Questions</Link>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Body</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {all_scripts && all_scripts.length ?
              all_scripts.map(script =>
                (
                  <ScriptsTableRow
                    script={script}
                    key={script.id}
                  />
                )
              ) :
              (<tr />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
