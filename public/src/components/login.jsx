import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../actions/login';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    this.props.loginUser(values, history);
  }

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          // type={!!field.name && field.name === 'password' ? 'password' : 'text'}
          className="form-control"
          placeholder={field.label}
          type={field.label}
          {...field.input}
        />
        <div className="text-help has-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            name="email"
            label="email"
            type="email"
            component={this.renderField}
          />
          <Field
            name="password"
            label="password"
            type="password"
            component={this.renderField}
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
