import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Popover, Row, Col } from 'react-bootstrap';

const UploadField = (props) => {
  const { label, helpText, name, input, meta, id } = props;
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
            id={id}
            onFocus={meta.onFocus}
            onChange={e => input.onChange({
              name: e.target.files[0].name,
              type: e.target.files[0].type
            })}
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

export default UploadField;
