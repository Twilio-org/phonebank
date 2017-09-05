import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';

import FieldGroup from '../../components/common/form/field_group';

export default class SideBarForm extends Component {
  render() {
    const { handleSubmit } = this.props;
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
  }
}
