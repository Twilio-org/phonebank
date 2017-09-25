import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { renderField } from './common/form_helpers';
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
      <div className="login-reg-form">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              name="email"
              label="Email"
              component={renderField}
            />
            <Field
              name="password"
              label="Password"
              component={renderField}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Log In</button>
            <Link className="register-link" to="/public/registration">Create an Account</Link>
          </div>
        </form>
      </div>
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
