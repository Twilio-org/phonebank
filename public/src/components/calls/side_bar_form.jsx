import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import FieldGroup from '../../components/common/form/field_group';

const SideBarForm = (props) => {
  const { handleSubmit } = props;
  const inputFieldProps = {
    label: 'notes',
    name: 'Notes'
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <hr />
        <Row>
          <Col sm={11}>
            <Field component={FieldGroup} type="textarea" {...inputFieldProps} />
          </Col>
        </Row>
      </form>
    </div>
  );
};

SideBarForm.displayName = 'SideBarForm';

export default SideBarForm;
