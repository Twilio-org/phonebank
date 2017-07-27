import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Header from './header';

class App extends Component {
  render() {
    const { auth, account_info } = this.props;
    const { id } = auth;
    return (
      <div>
        <Header userId={id} userInfo={account_info} />
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

function mapDispatchToProps() {
  return { };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
