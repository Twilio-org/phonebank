import React, { Component } from 'react';
// import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import CallQuestion from './call_question';

export default class CallsForm extends Component {
  render() {
    const { questions, change, form, status } = this.props;
    return (
      <form>
        <h3>Questions</h3>
        <hr />
        <fieldset disabled={status !== 'pending'}>
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
