import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import ContactListForm from '../contact_list/contact_list_form';

export default class CreateContactList extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
  }
  formSubmit(values) {
    var file = document.getElementById('file-upload');
    const { history } = this.props;
    console.log('==== before action', values);
    this.props.createContactList(file, values, history);
  }
  formCancel() {
    this.props.history.goBack();
    this.props.destroy('CreateContactList');
  }
  render() {
    const storeProps = this.props;
    return (
      <div>
        <PageHeader>Upload a Contact List</PageHeader>
        <ContactListForm onSubmit={this.formSubmit} onCancel={this.formCancel} {...storeProps} />
      </div>
    );
  }
}
