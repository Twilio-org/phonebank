import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
  }
}
function validateQuestionForm(values) {
  const errors = {};
  return errors;
}
export default withRouter(
  reduxForm({
    validateQuestionForm,
    form: 'QuestionForm'
  })(
    connect(null, null)(QuestionForm)
  )
);
