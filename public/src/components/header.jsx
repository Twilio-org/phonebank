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
    // links to pass into the navigation based on session info
    const { userId } = this.props;
    let links = [];
    if (userId) { // user is logged in aka id present
      links = [
        { title: 'Account', href: `/account/${userId}` },
        { title: 'Logout', href: '/logout' }
      ];
      if (this.props.userInfo && this.props.userInfo.is_admin) {
        links.push({ title: 'All Campaigns', href: '/campaigns' });
      }
    } else {
      links = [
        { title: 'Register', href: '/registration' },
        { title: 'Login', href: '/login' }
      ];
    }
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
            <Navigation
              title={!this.props.userId ? 'Menu' : this.props.userInfo.first_name}
              links={this.getLinks()}
              logout={this.props.logout}
            />
          </Col>
        </Row>
      </Navbar>
    );
  }
}
