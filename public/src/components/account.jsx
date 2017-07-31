import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { fetchUser, deleteUser } from '../actions/account_info';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.auth;
    this.props.fetchUser(id);
  }

  onDeleteClick() {
    const { id } = this.props.auth;
    console.log(id, 'user id on delete click')
    const { history } = this.props;
    console.log(this.props, 'meow');
    this.props.deleteUser(id, history);
  }

  render() {
    const { account_info } = this.props;
    const { id } = this.props.auth;
    const { first_name, last_name, email, phone_number } = account_info;

    return (
      <div>
        <h6>Name:</h6>
        <h3>{!!account_info ? `${first_name} ${last_name}` : ''}</h3>
        <h6>Email:</h6>
        <h3>{!!account_info ? email : ''}</h3>
        <h6>Phone:</h6>
        <h3>{!!account_info ? phone_number : ''}</h3>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to={`/account/${id}/edit`}>
            Edit Account
          </Link>
        </div>
        <div>
          <Button bsStyle="primary" onClick={this.onDeleteClick}>Delete Account</Button>
        </div>
      </div>
    );
  }
}

// AccountPage.propTypes = {
//   fetchUser: PropTypes.func,
//   auth: PropTypes.obj,
//   account_info: PropTypes.obj
// };

// AccountPage.defaultProps = {
//   fetchUser: () => 'meow',
//   auth: { id: 1 },
//   account_info: {
//     first_name: 'meow',
//     last_name: 'meows',
//     email: 'meow@meow.com',
//     phone_number: '12342345'
//   }
// };

function mapStateToProps(state) {
  return { auth: state.auth, account_info: state.account_info };
}

export default withRouter(
  connect(mapStateToProps, { fetchUser, deleteUser })(AccountPage)
);
