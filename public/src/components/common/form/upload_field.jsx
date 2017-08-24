import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const UploadField = (props) => {
  const { label, helpText, name, input, meta } = props;
  const errorClass = meta && meta.touched && meta.error ? 'error' : '';
  const errorText = meta && meta.touched ? meta.error : '';
  return (
    <Row>
      <Col xs={8}>
        <FormGroup className={errorClass !== '' ? `has-${errorClass}` : ''}>
          <ControlLabel>{label}</ControlLabel>
          {helpText && <HelpBlock>{helpText}</HelpBlock>}
          <input
            className={'well'}
            type={'file'}
            name={name}
            id="file-upload"
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
// onChange={e => input.onChange(e.target.files[0])}
// e => input.onChange(e.target.files[0])
// onChange={(e) => {
//   input.onChange(e.target.files[0]);
// }}
export default UploadField;
