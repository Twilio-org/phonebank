import React, { Component } from 'react';
import QuestionForm from './form';

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  formSubmit(values) {
    const { history } = this.props;
    this.props.createQuestion(values, history);
  }
  render() {
    const storeProps = this.props;
    return (
      <div>
        <h1>Create a Question</h1>
        <QuestionForm onSubmit={this.formSubmit} buttonText={'Create Question'} {...storeProps} />
      </div>
    );
  }
}
