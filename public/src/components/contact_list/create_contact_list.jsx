import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader } from 'react-bootstrap';
import ContactListForm from '../contact_list/contact_list_form';

export default class CreateContactList extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formCancel = this.formCancel.bind(this);
  }
  formSubmit(values) {
    // // const { history } = this.props;
    // console.log(values);
    // axios.post('/contactLists', values)
    // .then((response) => {
    //   console.log('post successful!!', response);
    //   return response;
    // })
    // .catch((err) => {
    //   const customError = {
    //     message: `error creating contact list: ${err}`,
    //     name: 'contact list post request'
    //   };
    //   throw customError;
    // });
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
