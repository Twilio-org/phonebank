import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import FieldGroup from '../../components/common/form/field_group';

const SideBarForm = () => {
  const inputFieldProps = {
    label: 'Notes',
    name: 'notes'
  };
  return (
    <form>
      <hr />
      <Row>
        <Col sm={11}>
          <Field component={FieldGroup} type="textarea" {...inputFieldProps} />
        </Col>
      </Row>
    </form>
  );
};

SideBarForm.displayName = 'SideBarForm';

export default SideBarForm;
