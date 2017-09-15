import React, { Component } from 'react';
import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions, change, form, status, outcome, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
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
