import React, { Component } from 'react';
// import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { handleSubmit, questions } = this.props;
    const current_call_status = 'pending';
    return (
      <form onSubmit={handleSubmit}>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={current_call_status !== 'pending'}>
          {
            questions && questions.map((question, i) => (
              <CallQuestion question={question} num={i} key={question.title} />
            ))
          }
        </fieldset>
      </form>
    );
  }
}
