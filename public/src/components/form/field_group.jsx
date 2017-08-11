import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const FieldGroup = (fieldProps) => {
  const { label, help, ...props } = fieldProps;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl {...props} />
    </FormGroup>
  );
};

export default FieldGroup;
