import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, PageHeader, ButtonToolbar, Row, Col } from 'react-bootstrap';

import { renderField, renderTextArea, renderDropdown } from '../common/form_helpers';
import FieldGroup from '../common/form/field_group';

export default class ScriptForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.renderDropdowns = this.renderDropdowns.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllQuestions();
  }

  onSubmit(values) {
    const { history } = this.props;
    const script = {
      name: values.name,
      body: values.body,
      description: values.description
    };
    const keys = Object.keys(values);
    const questions = [];
    const filteredKeys = keys.filter(key => key.includes('question'));

    filteredKeys.forEach((key) => {
      const sequence_num = key.slice(-1);
      questions.push({
        question_id: values[key],
        sequence_number: sequence_num
      });
    });

    this.props.postScript(script, questions, history);
  }

  cancelForm() {
    const { history, destroy } = this.props;
    destroy('CampaignPage');
    history.goBack();
  }

  handleCreateQuestion() {
    this.props.history.push('/admin/questions/new');
  }

  renderDropdowns() {
    if (this.props.questionOptions !== undefined) {
      return (
        <Row>
          <Col xs={6}>
            <Field
              name="question1"
              label="Question 1:"
              id="1"
              keyToUse="title"
              component={renderDropdown}
              options={this.props.questionOptions}
            />
            <Field
              name="question2"
              label="Question 2:"
              id="2"
              keyToUse="title"
              component={renderDropdown}
              options={this.props.questionOptions}
            />
            <Field
              name="question3"
              label="Question 3:"
              id="3"
              keyToUse="title"
              component={renderDropdown}
              options={this.props.questionOptions}
            />
            <Field
              name="question4"
              label="Question 4:"
              id="4"
              keyToUse="title"
              component={renderDropdown}
              options={this.props.questionOptions}
            />
            <Field
              name="question5"
              label="Question 5:"
              id="5"
              keyToUse="title"
              component={renderDropdown}
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
      <Row className="admin-form">
        <Col xs={12} mdOffset={3} md={6}>
          <PageHeader>Create Script</PageHeader>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              label="Name (Internal)"
              placeholder="Name"
              helpText="This is the name that admin will see when selecting a script"
              component={FieldGroup}
            />
            <Field
              name="description"
              label="Description (Public)"
              placeholder="Description"
              helpText="Provides details on how to use the script."
              type="textarea"
              component={FieldGroup}
            />
            <Field
              name="body"
              label="Body"
              placeholder="Body"
              helpText="Script text that volunteer will read before asking questions."
              type="textarea"
              component={FieldGroup}
            />
            <h2>Assign Script Questions</h2>
            <hr />
            {this.renderDropdowns()}
            <hr />
            <Row>
              <Col xs={4}>
                <Button
                  bsStyle="success"
                  onClick={this.handleCreateQuestion}
                >
                  Create New Question
                </Button>
              </Col>
              <Col xs={6}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">Save Script</Button>
                  <Button onClick={this.cancelForm}>Cancel</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    );
  }
}
