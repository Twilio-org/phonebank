import React, { Component } from 'react';
import ContactListForm from '../contact_list/contact_list_form';

export default class CreateContactList extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
  }
  formSubmit(values) {
    const { history } = this.props;
    console.log(history, values);
  }
  formCancel() {
    this.props.history.goBack();
    this.props.destroy('CreateContactList');
  }
  render() {
    const storeProps = this.props;
    return (
      <div>
        <h1>Upload a new Contact List</h1>
        <ContactListForm onSubmit={this.formSubmit} onCancel={this.formCancel} {...storeProps} />
      </div>
    );
  }
}
