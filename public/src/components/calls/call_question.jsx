import React, { Component } from 'react';

import { Field, FieldArray } from 'redux-form';
import { Row, Col, Badge } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import RadioGroup from '../../components/common/form/radio_group';
import CheckboxGroup from '../../components/common/form/checkbox_group';

export default class CallQuestion extends Component {
  componentDidMount() {
    const { change, form, question, num } = this.props;
    const responsesFieldName = `responses[${num}]`;
    const questionTypeFieldName = `${responsesFieldName}['type']`;
    const questionIdFieldName = `${responsesFieldName}['question_id']`;
    change(form, questionIdFieldName, question.question_id);
    change(form, questionTypeFieldName, question.type);
  }
  render() {
    const { question, num } = this.props;

    const questionText = question.description;
    const options = question.responses ? question.responses.split(',') : [];
    const responsesFieldName = `responses[${num}]`;
    const questionRespFieldName = `${responsesFieldName}['response']`;

    if (question.type === 'paragraph') {
      return (
        <Row>
          <Col sm={1}>
            <Badge>{num + 1}</Badge>
          </Col>
          <Col sm={11}>
            <Field
              name={questionRespFieldName}
              component={FieldGroup}
              type="textarea"
              label={questionText}
            />
            <hr />
          </Col>
        </Row>
      );
    } else if (question.type === 'multiselect') {
      return (
        <FieldArray
          component={CheckboxGroup}
          options={options}
          num={num}
          label={questionText}
          name={responsesFieldName}
        />
      );
    }
    return (
      <FieldArray
        component={RadioGroup}
        options={options}
        num={num}
        label={questionText}
        name={responsesFieldName}
      />
    );
  }
}
