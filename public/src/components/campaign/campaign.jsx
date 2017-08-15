import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar, PageHeader, Row, Col } from 'react-bootstrap';
import { renderField, renderDropdown, renderTextArea } from '../common/form_helpers';

export default class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateScript = this.handleCreateScript.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllScripts();
    this.props.fetchAllContactLists();
  }

  onSubmit(values) {
    const { history } = this.props;
    this.props.saveNewCampaign(values, history);
  }

  handleCreateScript() {
    this.props.history.push('/admin/scripts/new');
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
            <Button bsStyle="primary" type="submit">Save Campaign</Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
