import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, ControlLabel, Popover, Row, Col, Badge } from 'react-bootstrap';

const CheckboxGroup = (props) => {
  const { options,
          num,
          label,
          fields,
          meta,
          onChangeCustom } = props;
  // TO-DO: explore best way to show errors
  const errorText = meta && meta.invalid ? meta.error : false;
  return (
    <Row>
      <Col sm={1}>
        <Badge>{num + 1}</Badge>
      </Col>
      <Col sm={6}>
        <FormGroup>
          <ControlLabel>{label}</ControlLabel>
          {
            options.map((option, i) => (
              <div key={option}>
                <label htmlFor={`option${i}`} className="text-capitalize font-weight-normal">
                  <Field
                    id={`option${i}`}
                    component="input"
                    type="checkbox"
                    name={`${fields.name}[response][${option}]`}
                    onChange={onChangeCustom}
                    normalize={v => !!v}
                  />
                  {`  ${option}`}
                </label>
              </div>
            ))
          }
        </FormGroup>
        <hr />
      </Col>
      <Col xs={5}>
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

export default CheckboxGroup;
