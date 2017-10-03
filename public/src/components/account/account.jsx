import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap';

import { fetchUser, deleteUser } from '../../actions/users';

export class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    // DO NOT DELETE THE FOLLOWING LINES!!!!!
    // ['onDeleteClick'].forEach((func) => {
    //   this[func] = this[func].bind(this);
    // });
  }

  componentDidMount() {
    const { id } = this.props.auth;
    this.props.fetchUser(id);
  }

  onDeleteClick() {
    const { id } = this.props.auth;
    const { history } = this.props;
    this.props.deleteUser(id, history);
  }

  render() {
    const { account_info } = this.props;
    const { id } = this.props.auth;
    const { first_name, last_name, email, phone_number, is_admin } = account_info;

    return (
      <div className="admin-form">
        <PageHeader>Account</PageHeader>
        <h6>Name:</h6>
        <h3>{account_info ? `${first_name} ${last_name}` : ''}</h3>
        <h6>Email:</h6>
        <h3>{account_info ? email : ''}</h3>
        <h6>Phone:</h6>
        <h3>{account_info ? phone_number : ''}</h3>
        <ButtonToolbar>
          <Link className="btn btn-primary" to={is_admin ? `/admin/account/${id}/edit` : `/volunteers/account/${id}/edit`}>
            Edit Account
          </Link>
          <Button bsStyle="danger" onClick={this.onDeleteClick}>Delete Account</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, account_info: state.account_info };
}

export const ConnectedAccountPage = withRouter(
  connect(mapStateToProps, { fetchUser, deleteUser })(AccountPage)
);
