import React, { Component } from 'react';
import QuestionForm from './question_form';

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
  }
  formSubmit(values) {
    const { history } = this.props;
    this.props.createQuestion(values, history);
  }
  formCancel() {
    this.props.history.goBack();
    this.props.destroy('CreateQuestion');
  }
  render() {
    const storeProps = this.props;
    return (
      <div>
        <h1>Create a Question</h1>
        <QuestionForm onSubmit={this.formSubmit} onCancel={this.formCancel} buttonText={'Create Question'} {...storeProps} />
      </div>
    );
  }
}
