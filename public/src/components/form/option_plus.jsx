import React from 'react';
import { FormControl, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';

const OptionPlus = (fieldProps) => {
  const { label, help, num, addOnClick, removeOnClick, ...props } = fieldProps;
  return (
    <FormGroup id={`option${num}`}>
      <Row>
        <Col md={8}>
          <ControlLabel>{`${label} ${num}`}</ControlLabel>
          <FormControl {...props} />
        </Col>
        <Col md={4}>
          <Button onClick={removeOnClick} id={`remove-option-btn-${num}`} bsStyle="danger" bsSize="small">Remove</Button>
        </Col>
      </Row>
    </FormGroup>
  );
};

export default OptionPlus;
