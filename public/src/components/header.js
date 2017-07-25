import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Row, Col } from 'react-bootstrap';
import Navigation from './navigation';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNav: props.showNav
    };
  }
  getLinks() {
  }
  render() {
    return (
      <Navbar>
        <Row>
          <Col md={4}>
            <Navbar.Brand>
              <Link to="/">Phonebank</Link>
            </Navbar.Brand>
          </Col>
          <Col md={4} id="navigation">
            <Navigation />
          </Col>
        </Row>
      </Navbar>
    );
  }
}
