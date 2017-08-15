import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Row, Col, Popover } from 'react-bootstrap';

const TextArea = (textAreaProps) => {
  const { label, help, placeholder, errorClass, errorText, ...props } = textAreaProps;
  return (
    <Row>
      <Col xs={8}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''} >
          <ControlLabel>{label}</ControlLabel>
          {help && <HelpBlock>{help}</HelpBlock>}
          <FormControl
            componentClass="textarea"
            placeholder={placeholder}
            {...props}
          />
        </FormGroup>
      </Col>
      <Col xs={4}>
        <FormGroup>
          {errorText && <Popover
            id={`popover${label}`}
            placement="right"
            positionLeft={20}
            positionTop={50}
          >
            {errorText}
          </Popover>}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default TextArea;
