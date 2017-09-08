import React, { Component } from 'react';

import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions, change, form, status, outcome } = this.props;
    // ASSIGNED is only status we recieve that disables form
    return (
      <form>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={status === 'ASSIGNED' || outcome !== 'ANSWERED'}>
          {
            questions && questions.map((question, i) => (
              <CallQuestion
                question={question}
                num={i}
                key={question.title}
                change={change}
                form={form}
              />
            ))
          }
        </fieldset>
      </form>
    );
  }
}
