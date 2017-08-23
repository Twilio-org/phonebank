import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar, PageHeader, Row, Col } from 'react-bootstrap';
import { renderField, renderDropdown, renderTextArea } from '../common/form_helpers';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.saveDraft = this.saveDraft.bind(this);
    this.saveCampaign = this.saveCampaign.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleCreateScript = this.handleCreateScript.bind(this);
    this.handleCreateContactList = this.handleCreateContactList.bind(this);
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

  cancelForm() {
    const { history, destroy } = this.props;
    destroy('CampaignPage');
    history.goBack();
  }

  handleCreateScript() {
    this.props.history.push('/admin/scripts/new');
  }

  handleCreateContactList() {
    this.props.history.push('/admin/contactLists/new');
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
              {this.props.scripts ? (<Field
                name="script_id"
                label="Script"
                keyToUse="name"
                component={renderDropdown}
                options={this.props.scripts}
              />) : null }
              <Button
                bsStyle="success"
                onClick={this.handleCreateScript}
              >
                Add Script
              </Button>
              {this.props.contact_lists ? (<Field
                name="contact_lists_id"
                label="Contact List"
                keyToUse="name"
                component={renderDropdown}
                options={this.props.contact_lists}
              />) : null }
              <Button
                bsStyle="success"
                onClick={this.handleCreateContactList}
              >
                Add Contact List
              </Button>
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
            <Button
              bsStyle="primary"
              onClick={this.cancelForm}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
