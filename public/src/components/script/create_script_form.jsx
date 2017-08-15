import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, PageHeader, ButtonToolbar, Row, Col } from 'react-bootstrap';

import { renderField, renderTextArea, renderDropdown } from '../common/form_helpers';

export default class ScriptForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.renderDropdowns = this.renderDropdowns.bind(this);
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
                <Button>Cancel</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
