import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const CheckboxFieldGroup = (props) => {
  const { label, helpText, options, name } = props;
  console.log('NAME!!!!!!!', name);
  console.log('LABEL!!!!!!!', label);
  // const errorClass = meta && meta.touched && meta.error ? 'error' : '';
  // const errorText = meta && meta.touched ? meta.error : '';
  function renderOptions() {
    if (options) {
      return options.map((op, i) => (
        <div key={op}>
          <Field
            name={`${name}.${op}`}
            id={`option-${i}`}
            component="input"
            type="checkbox"
          />
          <label htmlFor={`option-${i}`}>{op}</label>
        </div>
      ));
    }
    return <span />;
  }
  return (
    <Row>
      <Col xs={8}>
        <FormGroup>
          <ControlLabel>{label}</ControlLabel>
          {helpText && <HelpBlock>{helpText}</HelpBlock>}
          {renderOptions()}
        </FormGroup>
      </Col>
    </Row>
  );
};
export default CheckboxFieldGroup;
// className={errorClass !== '' ? `has-${errorClass}` : ''}
// {/* <Col xs={4}>
//   {errorText && <Popover
//     id={`popover${label}`}
//     placement="right"
//     positionLeft={20}
//     positionTop={20}
//   >
//     {errorText}
//   </Popover>}
// </Col> */}
