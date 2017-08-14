import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import { renderQuestionField, renderQuestionTextArea, renderQuestionTypeDropdown, renderQuestionOption } from '../helpers/question_form_helpers';

export default class QuestionForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    const titleProps = {
      name: 'title',
      label: 'Title',
      component: renderQuestionField,
      helpText: 'For internal use.'
    };
    const descriptionProps = {
      name: 'description',
      label: 'Description',
      component: renderQuestionTextArea,
      helpText: 'What the volunteers will see.'
    };
    const questionTypeProps = {
      name: 'type',
      label: 'Type',
      component: renderQuestionTypeDropdown,
      options: ['Select', 'Paragraph', 'Singleselect', 'Multiselect']
    };
    const optionProps = {
      label: 'Option',
      component: renderQuestionOption
    };
    const type = this.props.questionType;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <Row>
          <Col md={12}>
            <Field {...titleProps} />
            <Field {...descriptionProps} />
            <Field {...questionTypeProps} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            { type && type !== 'paragraph' && type !== 'select' &&
              <Row>
                <Col md={12}>
                  <h2>Responses</h2>
                  <Field num={'1'} name={'option1'} {...optionProps} />
                  <Field num={'2'} name={'option2'} {...optionProps} />
                  <Field num={'3'} name={'option3'} {...optionProps} />
                  <Field num={'4'} name={'option4'} {...optionProps} />
                  <Field num={'5'} name={'option5'} {...optionProps} />
                </Col>
              </Row>
            }
          </Col>
        </Row>
        <Button type="submit" bsStyle="primary">{this.props.buttonText}</Button>
      </form>
    );
  }
}

QuestionForm.defaultProps = {
  buttonText: 'Create question'
};
