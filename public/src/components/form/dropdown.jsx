import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const Dropdown = (dropdownProps) => {
  const { label, help, options, placeholder, errorClass, errorText, ...props } = dropdownProps;
  function renderOptions() {
    if (options) {
      return options.map(op => (<option id={op} key={op} value={op.toLowerCase()}>{op}</option>));
    }
    return '';
  }
  return (
    <Row>
      <Col xs={8}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''}>
          <ControlLabel>{label}</ControlLabel>
          {help && <HelpBlock>{help}</HelpBlock>}
          <FormControl
            componentClass="select"
            placeholder={placeholder}
            {...props}
          >
            {renderOptions()}
          </FormControl>
        </FormGroup>
      </Col>
      <Col xs={4}>
        {errorText && <Popover
          id={`popover${label}`}
          placement="right"
          positionLeft={20}
          positionTop={20}
        >
          {errorText}
        </Popover>}
      </Col>
    </Row>
  );
};
export default Dropdown;
