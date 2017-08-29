import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';

const { questions: questionHeaders } = tableHeaders;

export default class QuestionsList extends Component {
  componentDidMount() {
    this.props.fetchAllQuestions();
  }

  render() {
    const { all_questions, account_info, history, setCurrentQuestion } = this.props;
    const thisPage = 'Question';
    const { view_edit } = buttons_obj;
    const { redirect_path } = questionHeaders;

    return (
      <div>
        {
          all_questions ? (
            <TableListView
              item_collection={all_questions}
              account_info={account_info}
              history={history}
              button_collection={view_edit}
              setCurrentItem={setCurrentQuestion}
              thisPage={thisPage}
              tableHeaders={questionHeaders}
              newPath={redirect_path}
            />
        ) : null
      }
      </div>
    );
  }
}
