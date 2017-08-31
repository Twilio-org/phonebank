import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { renderField } from '../components/common/form_helpers';
import { registerNewUser } from '../actions/users';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    this.props.registerNewUser(values, history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="first_name"
              label="First Name"
              component={renderField}
            />
          </div>
          <div className="col-md-6">
            <Field
              name="last_name"
              label="Last Name"
              component={renderField}
            />
          </div>
        </div>
        <Field
          name="email"
          label="Email"
          component={renderField}
        />
        <Field
          name="phone_number"
          label="Phone Number"
          component={renderField}
        />
        <Field
          name="password"
          label="Password"
          component={renderField}
        />
        <Field
          name="password_confirm"
          label="Confirm Password"
          component={renderField}
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Please enter your first name.';
  }
  if (!values.last_name) {
    errors.last_name = 'Please enter your last name.';
  }
  if (!values.email) {
    errors.email = 'Please enter your email.';
  } else if (!values.email.includes('@')) {
    errors.email = 'Please enter a valid email.';
  }
  if (!values.phone_number) {
    errors.phone_number = 'Please enter your phone number.';
  }
  if (!values.password) {
    errors.password = 'Please enter your password.';
  }
  if (!values.password_confirm) {
    errors.password_confirm = 'Please confirm your password.';
  }
  if (!!values.password && !!values.password_confirm && values.password
      !== values.password_confirm) {
    errors.password_confirm = 'The passwords must match.';
  }

  return errors;
}

export default withRouter(
  reduxForm({
    validate,
    form: 'RegistrationForm'
  })(
    connect(null, { registerNewUser })(RegistrationForm)
  )
);
