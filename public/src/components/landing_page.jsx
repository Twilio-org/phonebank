import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { PageHeader, Row, Col } from 'react-bootstrap';

class LandingPage extends Component {

  render() {
    const { id } = this.props.auth;
    return (
      <Row>
        <Col md={12}>
          <PageHeader>Phonebank</PageHeader>
          <p className="lead">A phone banking solution powered by Twilio</p>
          <Link to={`/account/${id}`}>View Account Details</Link><br />
          <Link to={`/script/${id}`}>View Script</Link><br />
        </Col>
      </Row>
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
  connect(mapStateToProps, mapDispatchToProps)(LandingPage)
);
