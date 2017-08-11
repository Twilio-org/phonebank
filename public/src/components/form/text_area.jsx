import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const TextArea = (textAreaProps) => {
  const { label, help, placeholder, ...props } = textAreaProps;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl
        componentClass="textarea"
        placeholder={placeholder}
        {...props}
      />
    </FormGroup>
  );
};

export default TextArea;
