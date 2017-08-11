import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const Dropdown = (dropdownProps) => {
  const { label, help, options, placeholder, ...props } = dropdownProps;
  function renderOptions() {
    if (options) {
      return options.map(op => (<option id={op} key={op} value={op}>{op}</option>));
    }
    return '';
  }
  return (
    <FormGroup>
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
  );
};
export default Dropdown;
