import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, PageHeader, DropdownButton, ButtonToolbar, Row, Col } from 'react-bootstrap';

import { renderField, renderTextArea } from '../helpers/formHelpers';
// import createNewScript from '../actions/script_form';
import Dropdown from './dropdown';

class ScriptForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    this.props.createNewScript(values, history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <PageHeader>Create Script</PageHeader>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Row>
            <Col xs={6}>
              <Field
                name="name"
                label="Name (internal)"
                component={renderField}
              />
            </Col>
            <Col xs={6}>
              <br />
              <p>This is the name that admin will see when selecting a script</p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Field
                name="description"
                label="Description (public)"
                component={renderTextArea}
              />
            </Col>
            <Col xs={6}>
              <br />
              <p>Provides details on how to use the script.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Field
                name="body"
                label="Body"
                component={renderTextArea}
              />
            </Col>
            <Col xs={6}>
              <br />
              <p>Script text that volunteer will read before asking questions.</p>
            </Col>
          </Row>
          <PageHeader>Assign Script Questions</PageHeader>
          <Row>
            <Col xs={6}>
              <Dropdown
                label="Question 1:"
                id="1"
              />
              <Dropdown
                label="Question 2:"
                id="2"
              />
              <Dropdown
                label="Question 3:"
                id="3"
              />
              <Dropdown
                label="Question 4:"
                id="4"
              />
              <Dropdown
                label="Question 5:"
                id="5"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Button bsStyle="success">Create New Question</Button>
            </Col>
            <Col xs={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Save Script</Button>
                <Button>Cancel</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

// export default ScriptForm;
export default withRouter(
  reduxForm({
    form: 'ScriptForm'
  })(
    connect(null, null)(ScriptForm)
  )
);
