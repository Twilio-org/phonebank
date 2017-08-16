import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const Dropdown = (props) => {
  const { label, help, options, placeholder, input, meta } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';
  const errorText = meta.touched ? meta.error : '';
  // Renders options passed in from props
  // Should be an an array of objects
  function renderOptions() {
    if (options) {
      return options.map(op =>
        (<option id={op.value} key={op.value} value={op.value}>
          {op.label}
        </option>)
      );
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
            {...input}
          >
            <option value="select">Select</option>
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
