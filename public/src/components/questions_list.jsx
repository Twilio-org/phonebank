import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import QuestionTableRow from './questions_table_row';

export default class QuestionsList extends Component {
  componentDidMount() {
    this.props.fetchAllQuestions();
  }

  render() {
    const { all_questions, account_info: { last_name, first_name } } = this.props;
    console.log('SHOULD BE ALL QYESTIONS', all_questions);
    return (
      <div>
        <h2>Welcome, {first_name} {last_name} to the Admin Campaigns Dashboard!</h2>
        <Button bsSize="xsmall">Create New Phone Bank</Button>
        <div>
          <Link to="/campaigns">View All Questions</Link>
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
