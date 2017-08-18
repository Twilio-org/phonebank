import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import Dropdown from '../../components/common/form/dropdown';
import QuestionResponses from './question_responses';

export default class QuestionForm extends Component {
  componentDidMount() {
    if (!this.props.onSubmit) {
      throw new Error('onSubmit is not passed. Pass in a function.');
    } else if (!this.props.onCancel) {
      throw new Error('onCancel is not passed. Pass in a function.');
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const type = this.props.questionType;
    const titleProps = {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Title',
      helpText: 'For internal use.'
    };
    const descriptionProps = {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Description',
      helpText: 'What the volunteers will see.'
    };
    const questionTypeProps = {
      name: 'type',
      label: 'Type',
      options: [
        { label: 'Paragraph', value: 'paragraph' },
        { label: 'Multiple Choice', value: 'singleselect' },
        { label: 'Checkboxes', value: 'multiselect' }
      ]
    };
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <Row>
          <Col md={12}>
            <Field component={FieldGroup} {...titleProps} />
            <Field component={FieldGroup} {...descriptionProps} />
            <Field component={Dropdown} {...questionTypeProps} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {
              type && type !== 'paragraph' && type !== 'select' &&
              <FieldArray
                name={'responses'}
                component={QuestionResponses}
              />
            }
          </Col>
        </Row>
        <ButtonToolbar>
          <Button type="submit" bsStyle="primary">{this.props.buttonText}</Button>
          <Button type="button" onClick={this.props.onCancel}>Cancel</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

QuestionForm.defaultProps = {
  buttonText: 'Create question'
};
