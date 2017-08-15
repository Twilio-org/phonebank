import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import QuestionTableRow from './questions_table_row';
import AdminDashboardButtonGroup from './admin_nav_btn_group';
import AdminBanner from './admin_welcome_banner';
import CreateNewButton from './admin_createNew_btn';

export default class QuestionsList extends Component {
  componentDidMount() {
    this.props.fetchAllQuestions();
  }

  render() {
    const { all_questions, account_info: { last_name, first_name }, history } = this.props;
    const thisPage = 'Question';

    return (
      <div>
        <AdminBanner
          first_name={first_name}
          last_name={last_name}
          history={history}
          page={thisPage}
        />
        <div>
          <AdminDashboardButtonGroup history={history} />
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Response Options</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {all_questions && all_questions.length ?
              all_questions.map(question =>
                (
                  <QuestionTableRow
                    question={question}
                    key={question.id}
                    handleEditClick={this.props.setCurrentQuestion}
                  />
                )
              ) :
              (<tr />)
            }
          </tbody>
        </Table>
        <div>
          <CreateNewButton {...this.props} page={thisPage} path={'/admin/questions/new'} />
        </div>
      </div>
    );
  }
}
