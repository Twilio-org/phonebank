import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class RegistrationForm extends Component {
  onSubmit(values) {
    console.log(values);
  }

  renderField(field){
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={!!field.name && field.name.slice(0,9) === 'password' ? 'password' : 'text'}
          className="form-control"
          placeholder={field.label}
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="row">
          <div className="col-md-6">
            <Field 
              name="first_name"
              label="First Name"
              component={this.renderField}
            />
          </div>
          <div className="col-md-6">
            <Field 
              name="last_name"
              label="Last Name"
              component={this.renderField}
            />
          </div>
        </div>
        <Field 
          name="email"
          label="Email"
          component={this.renderField}
        />
        <Field 
          name="phone_number"
          label="Phone Number"
          component={this.renderField}
        />
        <Field 
          name="password"
          label="Password"
          component={this.renderField}
        />
        <Field 
          name="password_confirm"
          label="Confirm Password"
          component={this.renderField}
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

function validate(values){
  //validate some stuff here
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Please enter your first name.';
  }
  if (!values.last_name) {
    errors.last_name = 'Please enter your last name.';
  }
  if (!values.email) {
    errors.email = 'Please enter your email.';
  } else if (!values.email.includes('@')){
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
  if (!!values.password && !!values.password_confirm && values.password !== values.password_confirm) {
    errors.password_confirm = 'The passwords must match.';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'RegistrationForm'
})(RegistrationForm);