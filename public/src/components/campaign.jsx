import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap';
import { renderField, renderDropdown, renderTextArea } from '../helpers/formHelpers';
import { saveNewCampaign } from '../actions/campaign';
import { fetchAllScripts, fetchAllContactLists } from '../actions/campaign_form';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    this.props.fetchAllScripts();
    this.props.fetchAllContactLists();
  }


  onSubmit(values) {
    const { history } = this.props;
    this.props.saveNewCampaign(values, history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <PageHeader>Add Campaign</PageHeader>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            label="Name (internal)"
            component={renderField}
          />
          <Field
            name="title"
            label="Title (public)"
            component={renderField}
          />
          <Field
            name="description"
            label="Description"
            component={renderTextArea}
          />
          {this.props.scriptOptions ? (<Field
            name="script_id"
            label="Script"
            keyToUse="name"
            component={renderDropdown}
            options={this.props.scriptOptions}
          />) : null }
          {this.props.contactListOptions ? (<Field
            name="contact_lists_id"
            label="Contact List"
            keyToUse="name"
            component={renderDropdown}
            options={this.props.contactListOptions}
          />) : null }
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">Save Campaign</Button>
          </ButtonToolbar>
        </form>
      </div>
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
  return {
    auth: state.auth,
    scriptOptions: state.campaign_form_scripts.scriptOptions,
    contactListOptions: state.campaign_form_contact_lists.contactListOptions
  };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'CampaignPage'
  })(
    connect(mapStateToProps, {
      saveNewCampaign,
      fetchAllScripts,
      fetchAllContactLists
    })(CampaignPage)
  )
);
