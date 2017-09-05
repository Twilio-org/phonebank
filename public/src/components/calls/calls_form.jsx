import React, { Component } from 'react';
import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions, change, form, call_active, outcome } = this.props;
    return (
      <form>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={outcome === 'PENDING' || !call_active}>
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
