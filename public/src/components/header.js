import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Row, Col } from 'react-bootstrap';
import Navigation from './navigation';

export default class Header extends Component {
  constructor(props) {
    super(props);
    // Bind
    this.getLinks = this.getLinks.bind(this);
  }
  getLinks() {
    // CHANGE: ideally this method would get the appropriate
    // links to pass into the navigation based on session info
    const links = [
      { title: 'Register', href: '/registration' },
      { title: 'Login', href: '/login' }
    ];
    return links;
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
            <Navigation links={this.getLinks}/>
          </Col>
        </Row>
      </Navbar>
    );
  }
}
