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
  getLinks(parent) {
    // links to pass into the navigation based on session info
    const { userId } = this.props;
    let links = [];

    if (userId) { // user is logged in aka id present
      links = [
        { title: 'Account', href: `${parent}/account/${userId}` },
        { title: 'Logout', href: '/logout' }
      ];
    } else {
      links = [
        { title: 'Register', href: '/public/registration' },
        { title: 'Login', href: '/public/login' }
      ];
    }
    return links;
  }
  render() {
    const { isAdmin, userId } = this.props;
    let parent;
    if (isAdmin && userId) {
      parent = '/admin';
    } else if (!isAdmin && userId) {
      parent = '/volunteers';
    } else {
      parent = '/public';
    }
    return (
      <Navbar fluid inverse collapseOnSelect>
        <Row>
          <Col md={8}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={parent}>Phonebank</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Col>
          <Col md={4} id="navigation">
            <Navbar.Collapse>
              <Navigation
                title={!this.props.userId ? 'Menu' : this.props.userInfo.first_name}
                links={this.getLinks(parent)}
                logout={this.props.logout}
                history={this.props.history}
              />
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    );
  }
}
