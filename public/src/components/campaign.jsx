import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  onSubmit(values) {

  }


  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={field.label}>{field.label}
          <input
            type={'text'}
            className="form-control"
          />
        </label>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name_internal"
          label="Name (internal)"
          component={this.renderField}
        />
        <Field
          name="title_public"
          label="Title (public)"
          component={this.renderField}
        />
        <Field
          name="description"
          label="Description"
          component={this.renderField}
        />
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit">Save Campaign</Button>
        </ButtonToolbar>
      </form>
    );
  }
}


function validate(values) {
  const errors = {};
  const { password, password_confirm } = values;
  if (!!password && !!password_confirm && password !== password_confirm) {
    errors.password_confirm = 'the passwords must match.';
  }
  return errors;
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'CampaignPage'
  })(
    connect(mapStateToProps, {})(CampaignPage)
  )
);
