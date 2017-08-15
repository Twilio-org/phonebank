import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import ScriptsTableRow from './scripts_table_row';
import AdminDashboardButtonGroup from './admin_nav_btn_group';
import AdminBanner from './admin_welcome_banner';
import CreateNewButton from './admin_createNew_btn';
import buttons_obj from './admin_button_objs';

export default class ScriptsList extends Component {
  componentDidMount() {
    this.props.fetchAllScripts();
  }

  render() {
    const { all_scripts, account_info: { last_name, first_name }, history } = this.props;
    const thisPage = 'Script';
    const { view_edit } = buttons_obj;
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
                    key={script.id}
                    script={script}
                    handleEditClick={this.props.setCurrentScript}
                    buttons={view_edit}
                    page={thisPage}
                  />
                )
              ) :
              (<tr />)
            }
          </tbody>
        </Table>
        <div>
          <CreateNewButton {...this.props} page={thisPage} path={'/admin/scripts/new'} />
        </div>
      </div>
    );
  }
}
