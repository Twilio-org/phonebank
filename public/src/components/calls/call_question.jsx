import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Badge, ControlLabel, FormGroup } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';

const CallQuestion = (props) => {
  const { question, num, change, form } = props;

  const questionText = question.description;
  const options = question.responses ? question.responses.split(',') : [];

  const questionIdFieldName = `responses[${num}]['question_id']`;
  const questionRespFieldName = `responses[${num}]['response']`;

  const setQuestionId = () => {
    change(form, questionIdFieldName, question.question_id);
  };

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
            onChange={setQuestionId}
          />
          <hr />
        </Col>
      </Row>
    );
  } else if (question.type === 'multiselect') {
    return (
      <Row>
        <Col sm={1}>
          <Badge>{num + 1}</Badge>
        </Col>
        <Col sm={11}>
          <FormGroup>
            <ControlLabel>{questionText}</ControlLabel>
            {
              options.map((option, i) => (
                <div key={option}>
                  <label htmlFor={`option${i}`} className="text-capitalize font-weight-normal">
                    <Field
                      id={`option${i}`}
                      component="input"
                      type="checkbox"
                      name={`${questionRespFieldName}[${i}]`}
                      onChange={setQuestionId}
                    />
                    {`  ${option}`}
                  </label>
                </div>
              ))
            }
          </FormGroup>
          <hr />
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col sm={1}>
        <Badge>{num + 1}</Badge>
      </Col>
      <Col sm={11}>
        <FormGroup>
          <ControlLabel>{questionText}</ControlLabel>
          {
            options.map(option => (
              <div key={option}>
                <label htmlFor={option} className="text-capitalize font-weight-normal">
                  <Field
                    id={option}
                    component="input"
                    type="radio"
                    name={questionRespFieldName}
                    value={option}
                    onChange={setQuestionId}
                  />
                  {`  ${option}`}
                </label>
              </div>
            ))
          }
        </FormGroup>
        <hr />
      </Col>
    </Row>
  );
};

export default CallQuestion;
