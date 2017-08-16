import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const FieldGroup = (props) => {
  const { label, helpText, name, type, placeholder, input, meta } = props;
  const errorClass = meta && meta.touched && meta.error ? 'error' : '';
  const errorText = meta && meta.touched ? meta.error : '';
  return (
    <Row>
      <Col xs={8}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''}>
          <ControlLabel>{label}</ControlLabel>
          {helpText && <HelpBlock>{helpText}</HelpBlock>}
          <FormControl
            componentClass={type === 'textarea' ? type : 'input'}
            type={type === 'text' ? 'text' : ''}
            name={name}
            placeholder={placeholder}
            {...input}
          />
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

export default FieldGroup;
