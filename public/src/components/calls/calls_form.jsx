import React, { Component } from 'react';

import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions,
            change,
            form,
            status,
            outcome,
            no_calls_available } = this.props;
    // ASSIGNED is only status we recieve that disables form
    return (
      <form>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={status === 'ASSIGNED' || outcome !== 'ANSWERED' || no_calls_available === true}>
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
