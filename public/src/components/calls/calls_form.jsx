import React, { Component } from 'react';
import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions,
            change,
            form,
            status,
            outcome,
            handleSubmit,
            disable_call_control } = this.props;
    // ASSIGNED is only status we recieve that disables form
    return (
      <form onSubmit={handleSubmit}>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={status === 'ASSIGNED' || outcome !== 'ANSWERED' || disable_call_control === true}>
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
