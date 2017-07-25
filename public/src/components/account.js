import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchUser } from '../actions/account_info';

class AccountPage extends Component {
  componentDidMount() {
    const { id } = this.props.auth;
    this.props.fetchUser(id);
  }

  // onEditClick() {
  //   const { id } = this.props.match.params;
  //   this.props.editPost(id, () => {
  //     this.props.history.push('/account/edit');
  //   });
  // }

  render() {
    return (
      <div>
        <h6>Name:</h6>
          <h3>{!!this.props.account_info ? `${this.props.account_info.first_name} ${this.props.account_info.last_name}` : ''}</h3>
        <h6>Email:</h6>
          <h3>{!!this.props.account_info ? this.props.account_info.email : ''}</h3>
        <h6>Phone:</h6>
          <h3>{!!this.props.account_info ? this.props.account_info.phone_number : ''}</h3>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/account/edit">
            Edit Account
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {auth: state.auth, account_info: state.account_info}
}

// function mapStateToProps({ user }) {
  // return { user };
  // return { user: users[ownProps.match.params.id] };
}

export default withRouter(
  connect(mapStateToProps, { fetchUser })(AccountPage)
);
