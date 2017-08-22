import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import FieldGroup from '../../components/common/form/field_group';

export default class ContactListForm extends Component {
  componentDidMount() {
    if (!this.props.onSubmit) {
      throw new Error('onSubmit is not passed. Pass in a function.');
    } else if (!this.props.onCancel) {
      throw new Error('onCancel is not passed. Pass in a function.');
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const nameFieldProps = {
      type: 'text',
      label: 'Contact List Name',
      name: 'name'
    };
    const uploadFieldProps = {
      type: 'file',
      label: 'Select CSV to Upload',
      name: 'csv',
      helpText: 'The CSV file must have a header row with the following fields First Name, Last Name, Phone, Email, External ID.\nAll rows must have at least a First Name and Phone Number.\nOptional fields may include Language, City, State, Country, Timezone'
    };
    return (
      <form
        ref={'uploadForm'}
        id={'uploadForm'}
        action={'http://localhost:3000/contactLists'}
        method={'post'}
        encType="multipart/form-data"
      >
        <Field component={FieldGroup} {...nameFieldProps} />
        <FieldGroup {...uploadFieldProps} />
        <ButtonToolbar>
          <Button type="submit" bsStyle="primary">Save Contact List</Button>
          <Button type="button" onClick={this.props.onCancel}>Cancel</Button>
        </ButtonToolbar>
      </form>
    );
  }
}
