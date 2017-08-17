import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import Dropdown from '../../components/common/form/dropdown';

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
            { type && type !== 'paragraph' && type !== 'select' &&
              <Row>
                <Col md={12}>
                  <h2>Responses</h2>
                  {[1, 2, 3, 4, 5].map(i =>
                    (<Field
                      key={i}
                      type="text"
                      label={`Option ${i}`}
                      component={FieldGroup}
                      name={`option${i}`}
                      placeholder={`Option ${i}`}
                    />)
                  )}
                </Col>
              </Row>
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
