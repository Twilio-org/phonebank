import React from 'react';
import { Field, Fields, FieldArray } from 'redux-form';
import { Row, Col, Badge, ControlLabel } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import CheckboxFieldGroup from '../../components/common/form/checkbox_field_group';

const CallQuestion = (props) => {
  const { question, num } = props;
  const inputFieldProps = {
    label: question.description,
    name: `responses.question${question.question_id}`
  };
  if (question.type === 'paragraph') {
    return (
      <Row>
        <Col sm={1}>
          <Badge>{num + 1}</Badge>
        </Col>
        <Col sm={11}>
          <Field component={FieldGroup} type="textarea" {...inputFieldProps} />
        </Col>
      </Row>
    );
  } else if (question.type === 'multiselect') {
    const options = question.responses.split(',');
    return (
      <Row>
        <Col sm={1}>
          <Badge>{num + 1}</Badge>
        </Col>
        <Col sm={11}>
          <ControlLabel>{question.description}</ControlLabel>
          {
            options.map((option, i) => (
              <div key={option}>
                <label htmlFor={`option${i}`} className="text-capitalize font-weight-normal">
                  <Field id={`option${i}`} component="input" type="checkbox" name={`responses.question${question.question_id}.option${i}`} value={option} />
                  {`  ${option}`}
                </label>
              </div>
            ))
          }
        </Col>
      </Row>
    );
  }
  const options = question.responses.split(',');
  return (
    <Row>
      <Col sm={1}>
        <Badge>{num + 1}</Badge>
      </Col>
      <Col sm={11}>
        <ControlLabel>{question.description}</ControlLabel>
        {
          options.map(option => (
            <div key={option}>
              <label htmlFor={option} className="text-capitalize font-weight-normal">
                <input name={`responses.question${question.question_id}.question_id`} value={question.question_id} hidden />
                <Field id={option} component="input" type="radio" name={`responses.question${question.question_id}`} value={option} />
                {`  ${option}`}
              </label>
            </div>
          ))
        }
      </Col>
    </Row>
  );
};

export default CallQuestion;
