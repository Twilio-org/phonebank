import React, { Component } from 'react';
import QuestionForm from '../components/question_form';

export default class QuestionNewForm extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  formSubmit(values) {
    const { history } = this.props;
    this.props.createQuestion(values, history);
  }
  render() {
    const props = this.props;
    return (
      <div>
        <h1>Create a Question</h1>
        <QuestionForm onSubmit={this.formSubmit} {...props} />
      </div>
    );
  }
}
