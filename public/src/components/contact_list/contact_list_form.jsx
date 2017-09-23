import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import UploadField from '../../components/common/form/upload_field';

export default class ContactListForm extends Component {
  render() {
    const { handleSubmit, onSubmit, onCancel, onClear } = this.props;
    const nameFieldProps = {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'e.g. South Berkeley Call List'
    };
    const uploadFieldProps = {
      id: 'file-upload',
      type: 'file',
      label: 'CSV Upload',
      name: 'csv',
      helpText: 'Required header row fields: First Name, Last Name, Phone, Email, External ID.'
    };
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field component={FieldGroup} {...nameFieldProps} />
        <Field component={UploadField} {...uploadFieldProps} />
        <ButtonToolbar>
          <Button type="submit" bsStyle="primary">Save Contact List</Button>
          <Button type="button" onClick={onClear}>Clear</Button>
          <Button type="button" onClick={onCancel}>Cancel</Button>
        </ButtonToolbar>
      </form>
    );
  }
}
