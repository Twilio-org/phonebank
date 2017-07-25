import React, { Component } from 'react';
import { PageHeader, Row, Col } from 'react-bootstrap';

export default class LandingPage extends Component{
  render() {
    return (
      <Row>
        <Col md={12}>
          <PageHeader>Phonebank</PageHeader>
          <p className="lead">A phone banking solution powered by Twilio</p>
        </Col>
      </Row>
    );
  }
}
