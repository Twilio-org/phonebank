import React, { Component } from 'react';
import { Field } from 'redux-form';
import { renderField } from '../common/form_helpers';

export default class ContactListPage extends Component {
  constructor(props) {
    super(props);
    this.cancelForm = this.cancelForm.bind(this);
  }

  cancelForm() {
    const { history, destroy } = this.props;
    destroy('ContactListPage');
    history.goBack();
  }

  render() {
    return (
      <div>
        <form>
          <Field
            name="name"
            label="Name"
            component={renderField}
          />
        </form> 
      </div>
    )
  }
}