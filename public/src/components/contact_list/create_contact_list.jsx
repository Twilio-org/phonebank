import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import ContactListForm from '../contact_list/contact_list_form';

export default class CreateContactList extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
    this.formClear = this.formClear.bind(this);
  }
  formSubmit(values) {
    // TO-DO: Find a way to make files work with redux-form in future
    const file = document.getElementById('file-upload');
    const { history } = this.props;
    this.props.createContactList(file, values.name, history);
  }
  formCancel() {
    this.props.history.goBack();
    this.props.destroy('CreateContactList');
  }
  formClear() {
    // TO-DO: Find a way to make files work with redux-form in future
    const file = document.getElementById('file-upload');
    if (file) {
      file.value = null;
    }
    this.props.destroy('CreateContactList');
  }
  render() {
    const storeProps = this.props;
    return (
      <div>
        <PageHeader>Upload a Contact List</PageHeader>
        <ContactListForm
          onSubmit={this.formSubmit}
          onCancel={this.formCancel}
          onClear={this.formClear}
          {...storeProps}
        />
      </div>
    );
  }
}
