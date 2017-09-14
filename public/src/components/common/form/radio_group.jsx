import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, ControlLabel, Popover, Row, Col, Badge } from 'react-bootstrap';

const RadioGroup = (props) => {
  const { options,
          num,
          label,
          fields,
          meta,
          onChangeCustom } = props;
  const errorClass = meta && meta.invalid ? 'error' : '';
  const errorText = meta ? meta.error : '';
  return (
    <Row>
      <Col sm={1}>
        <Badge>{num + 1}</Badge>
      </Col>
      <Col sm={7}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''}>
          <ControlLabel>{label}</ControlLabel>
          {
            options.map(option => (
              <div key={option}>
                <label htmlFor={option} className="text-capitalize font-weight-normal">
                  <Field
                    id={option}
                    type="radio"
                    component="input"
                    value={option}
                    name={`${fields.name}[response]`}
                    onChange={onChangeCustom}
                  />
                  {`  ${option}`}
                </label>
              </div>
            ))
          }
        </FormGroup>
      </Col>
      <Col xs={4}>
        {errorText && <Popover
          id={`popover${label}`}
          placement="right"
          positionLeft={20}
          positionTop={50}
        >
          {errorText}
        </Popover>}
      </Col>
    </Row>
  );
};

export default RadioGroup;
