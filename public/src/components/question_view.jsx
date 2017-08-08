import React, { Component } from 'react';
import QuestionForm from '../containers/question_form';

export default class QuestionView extends Component {
  render() {
    const props = {}; // props will be coming from a container
    return (
      <QuestionForm {...props} />
    );
  }
}
