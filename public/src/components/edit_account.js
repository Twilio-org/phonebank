import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser } from '../actions/edit_account';

class EditAccountInfo extends Component {
  onSubmit(values) {
    const { history } = this.props;
    this.props.updateUser(values, history);
  }

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    // const { user } = this.props;
    const Allie = {
      first_name: 'joe',
      last_name: 'smith',
      email: 'joe@meow.com',
      phone_number: '12345678901'
    }

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={!!field.name && field.name.slice(0, 9) === 'password' ? 'password' : 'text'}
          className="form-control"
          placeholder={Allie[field.name]}
          {...field.input}
        />
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
        <button type="submit">Update</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!!values.password && !!values.password_confirm && values.password !== values.password_confirm) {
    errors.password_confirm = 'The passwords must match.';
  }
  return errors;
}

export default withRouter(
  reduxForm({
    validate,
    form: 'EditedAccountInfo'
  })(
    connect(null, { updateUser })(EditAccountInfo)
  )
);
