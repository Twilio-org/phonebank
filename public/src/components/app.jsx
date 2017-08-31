import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Header from './header';
import { logoutUser } from '../actions/login';

class App extends Component {
  componentDidMount() {
    const { history } = this.props;
    let is_admin = localStorage.getItem('permissions');
    const id = localStorage.getItem('user_id');
    const token = localStorage.getItem('auth_token');
    if (id !== null && token !== null && is_admin !== null) {
      // id and token not null means the user is logged in
      is_admin = JSON.parse(is_admin.toLowerCase());
      // check for admin
      if (is_admin) {
        return history.replace({ pathname: '/admin' });
      }
      // if not admin and logged in go to volunteer
      return history.replace({ pathname: '/volunteers' });
    }
    return history.replace({ pathname: '/public' });
  }
  render() {
    const { auth, account_info, history } = this.props;
    const logoutUserAction = this.props.logoutUser;
    const { id, is_admin } = auth;
    return (
      <div>
        <Header
          userId={id}
          isAdmin={is_admin}
          userInfo={account_info}
          logout={logoutUserAction}
          history={history}
        />
        <section id="content">
          <Grid fluid>
            {this.props.children}
          </Grid>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    account_info: state.account_info
  };
}

export default withRouter(
  connect(mapStateToProps, { logoutUser })(App)
);
