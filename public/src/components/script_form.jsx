import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, PageHeader, DropdownButton, ButtonToolbar, Row, Col } from 'react-bootstrap';
import { fetchAllQuestions } from '../actions/script_form';

import { renderField, renderTextArea } from '../helpers/formHelpers';
// import createNewScript from '../actions/script_form';
import Dropdown from './dropdown';

class ScriptForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderDropdowns = this.renderDropdowns.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllQuestions();
  }

  onSubmit(values) {
    const { history } = this.props;
    this.props.createNewScript(values, history);
  }

  renderDropdowns() {
    if (this.props.questionOptions !== undefined) {
      return (
        <Row>
          <Col xs={6}>
            <Dropdown
              name="question1"
              label="Question 1:"
              id="1"
              options={this.props.questionOptions}
            />
            <Dropdown
              label="Question 2:"
              id="2"
              options={this.props.questionOptions}
            />
            <Dropdown
              label="Question 3:"
              id="3"
              options={this.props.questionOptions}
            />
            <Dropdown
              label="Question 4:"
              id="4"
              options={this.props.questionOptions}
            />
            <Dropdown
              label="Question 5:"
              id="5"
              options={this.props.questionOptions}
            />
          </Col>
        </Row>
      );
    }
    return null;
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
          {this.renderDropdowns()}
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

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter a name for your script.';
  }
  if (!values.description) {
    errors.description = 'Please enter a description for your script.';
  }
  if (!values.body) {
    errors.body = 'Please enter a body for your script.';
  }
  if (!values.question1) {
    errors.question1 = 'Please select at least one question for your script.';
  }
  return errors;
}

// export default reduxForm({
//   validate,
//   form: 'ScriptForm'
// });


function mapStateToProps(state) {
  return { questionOptions: state.script_form.questionOptions };
}

// so fetchAllQuestions get into state, so we can call it in componentDidMount
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllQuestions }, dispatch);
}

export default withRouter(
  reduxForm({
    validate,
    form: 'ScriptForm'
  })(
    connect(mapStateToProps, mapDispatchToProps)(ScriptForm)
  )
);
