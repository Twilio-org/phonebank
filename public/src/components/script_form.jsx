import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import renderField from '../helpers/formHelpers';
import createNewScript from '../actions/script_form';
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
      <PageHeader>Create Script</PageHeader>
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          label="Name (internal)"
          component={renderField}
        />
        <Field
          name="description"
          label="Description (public)"
          component={renderField}
        />
        <Field
          name="body"
          label="Body"
          component={renderField}
        />
        <PageHeader>Assign Script Questions</PageHeader>
        <Dropdown
          name="question_1"
          label="Question 1"
        />
        <Dropdown
          name="question_2"
          label="Question 2"
        />
        <Dropdown
          name="question_3"
          label="Question 3"
        />
        <Dropdown
          name="question_4"
          label="Question 4"
        />
        <Dropdown
          name="question_5"
          label="Question 5"
        />
        <Button bsStyle="primary">Create New Question</Button>
        <button type="submit">Save Script</button>
        <Button>Cancel</Button>
      </form>
      )
  }
}
