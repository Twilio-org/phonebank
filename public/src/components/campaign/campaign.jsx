import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar, PageHeader, Row, Col } from 'react-bootstrap';
import { renderField, renderDropdown, renderTextArea } from '../common/form_helpers';
import { saveNewCampaign } from '../../actions/campaign';
import { fetchAllScripts, fetchAllContactLists } from '../../actions/campaign_form';

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.saveDraft = this.saveDraft.bind(this);
    this.saveCampaign = this.saveCampaign.bind(this);
    this.handleCreateScript = this.handleCreateScript.bind(this);
  }


  componentDidMount() {
    this.props.fetchAllScripts();
    this.props.fetchAllContactLists();
  }

  saveDraft(values) {
    const { history } = this.props;
    this.props.saveNewCampaign([values, 'draft'], history);
  }

  saveCampaign(values) {
    const { history } = this.props;
    this.props.saveNewCampaign([values, 'active'], history);
  }

  handleCreateScript() {
    this.props.history.push('/admin/scripts/new');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <PageHeader>Add Campaign</PageHeader>
        <form>
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
          <Row>
            <Col xs={5}>
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
              <Button
                bsStyle="success"
                onClick={this.handleCreateScript}
              >
                Add Script
              </Button>
              {this.props.contactListOptions ? (<Field
                name="contact_lists_id"
                label="Contact List"
                keyToUse="name"
                component={renderDropdown}
                options={this.props.contactListOptions}
              />) : null }
            </Col>
          </Row>
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              type="submit"
              onClick={handleSubmit(this.saveDraft)}
            >
              Save as Draft
            </Button>
            <Button
              bsStyle="primary"
              type="submit"
              onClick={handleSubmit(this.saveCampaign)}
            >
              Start Campaign
            </Button>
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
    scriptOptions: state.admin_campaign.scripts,
    contactListOptions: state.admin_campaign.contact_list
  };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'CampaignPage',
    destroyOnUnmount: false
  })(
    connect(mapStateToProps, {
      saveNewCampaign,
      fetchAllScripts,
      fetchAllContactLists
    })(CampaignPage)
  )
);
