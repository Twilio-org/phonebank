import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Header from './header';
import { logoutUser } from '../actions/login';

class App extends Component {
  render() {
    const { auth, account_info, logoutUser, history } = this.props;
    const { id } = auth;
    return (
      <div>
        <Header
          userId={id}
          userInfo={account_info}
          logout={logoutUser}
          history={history}
        />
        <section id="content">
          <Grid>
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
