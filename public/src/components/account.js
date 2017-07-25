import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AccountPage extends Component {
  componentDidMount() {
    //not yet functional, no user id info in the store or in params
    const { id } = this.props.match.params;
    // this.props.fetchUser(id);
  }

  // onEditClick() {
  //   const { id } = this.props.match.params;
  //   this.props.editPost(id, () => {
  //     this.props.histpry.push('/account/edit');
  //   });
  // }

  render() {
    // const { user } = this.props;
    const user = {
      first_name: 'joe',
      last_name: 'smith',
      email: 'joe@meow.com',
      phone_number: '12345678901'
    }

    return (
      <div>
        <h6>Name:</h6>
          <h3>{user.first_name} {user.last_name}</h3>
        <h6>Email:</h6>
          <h3>{user.email}</h3>
        <h6>Phone:</h6>
          <h3>{user.phone_number}</h3>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/account/edit">
            Edit Account
          </Link>
        </div>
      </div>
    );
  }
}

export default AccountPage;

// function mapStateToProps({ users }, ownProps) {
//   return { user: users[ownProps.match.params.id] }
// }

// export default connect(mapStateToProps, { fetchUser })(AccountPage);