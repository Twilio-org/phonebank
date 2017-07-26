import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Row, Col } from 'react-bootstrap';

export default class LandingPage extends Component{

  render(){
  const id = 1;
    return(
      <Row>
        <Col md={12}>
          <PageHeader>Phonebank</PageHeader>
          <p className="lead">A phone banking solution powered by Twilio</p>
          <Link to={`/account/${id}`}>View Account Details</Link>
        </Col>
      </Row>
    );
  };
}
