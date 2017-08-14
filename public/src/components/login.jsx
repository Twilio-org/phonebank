import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { renderField } from '../helpers/formHelpers';
import { loginUser } from '../actions/login';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    this.props.loginUser(values, history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            name="email"
            label="email"
            component={renderField}
          />
          <Field
            name="password"
            label="password"
            component={renderField}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter your email.';
  }
  if (!values.password) {
    errors.password = 'Please enter your password.';
  }
  return errors;
}

export default withRouter(
  reduxForm({
    validate,
    form: 'LogInForm'
  })(
  connect(null, { loginUser })(LogInForm),
  ),
);
