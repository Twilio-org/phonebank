import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar, PageHeader, Row, Col } from 'react-bootstrap';
import { renderDropdown } from '../common/form_helpers';
import FieldGroup from '../common/form/field_group';

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
      <Row className="admin-form">
        <Col xs={12} mdOffset={3} md={6}>
          <PageHeader>Add Campaign</PageHeader>
          <form>
            <Row>
              <Col xs={12}>
                <Field
                  name="name"
                  label="Name"
                  helpText="Internal"
                  placeholder="Name"
                  component={FieldGroup}
                />
                <Field
                  name="title"
                  label="Title"
                  helpText="Public"
                  placeholder="Title"
                  component={FieldGroup}
                />
                <Field
                  name="description"
                  label="Description"
                  placeholder="Description"
                  type="textarea"
                  component={FieldGroup}
                />
              </Col>
            </Row>
            <Row>
              {this.props.scripts ? (<Col md={4}><Field
                name="script_id"
                label="Script"
                keyToUse="name"
                component={renderDropdown}
                options={this.props.scripts}
              /></Col>) : null }
              <Col md={8} className={'form-add-btn'}><Button
                bsStyle="success"
                onClick={this.handleCreateScript}
              >
                Add Script
              </Button></Col>
            </Row>
            <Row>
              {this.props.contact_lists ? (<Col md={4}><Field
                name="contact_lists_id"
                label="Contact List"
                keyToUse="name"
                component={renderDropdown}
                options={this.props.contact_lists}
              /></Col>) : null }
              <Col md={8} className={'form-add-btn'}><Button
                bsStyle="success"
                onClick={this.handleCreateContactList}
              >
                Add Contact List
              </Button></Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12}>
                <ButtonToolbar>
                  <Button
                    bsStyle="warning"
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
                    onClick={this.cancelForm}
                  >
                    Cancel
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    );
  }
}
