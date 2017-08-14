import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const FieldGroup = (fieldProps) => {
  const { label, help, errorClass, errorText, ...props } = fieldProps;
  return (
    <Row>
      <Col xs={8}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''}>
          <ControlLabel>{label}</ControlLabel>
          {help && <HelpBlock>{help}</HelpBlock>}
          <FormControl {...props} />
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
