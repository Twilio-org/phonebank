import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';
import UploadField from '../../components/common/form/upload_field';

export default class ContactListForm extends Component {
  componentDidMount() {
    if (!this.props.onSubmit) {
      throw new Error('onSubmit is not passed. Pass in a function.');
    } else if (!this.props.onCancel) {
      throw new Error('onCancel is not passed. Pass in a function.');
    }
  }
  render() {
    const { handleSubmit, onSubmit } = this.props;
    const nameFieldProps = {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'e.g. South Berkley Call List'
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
          <Button type="button" onClick={this.props.onCancel}>Cancel</Button>
        </ButtonToolbar>
      </form>
    );
  }
}
