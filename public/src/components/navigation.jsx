import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Nav, NavDropdown } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logoutOnClick = this.logoutOnClick.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
  }
  logoutOnClick() {
    const { history } = this.props;
    this.props.logout(history);
  }
  renderLinks() {
    return (
      this.props.links.map((link) => {
        if (link.href === '/logout') {
          return <MenuItem key={link.title} onClick={this.logoutOnClick}>{link.title}</MenuItem>;
        }
        return (
          <li role="presentation" key={link.title}>
            <Link tabIndex="-1" role="menuitem" to={link.href}>{link.title}</Link>
          </li>
        );
      })
    );
  }
  render() {
    return (
      <Nav pullRight>
        <NavDropdown title={this.props.title ? this.props.title : ''} id="menu">
          {this.renderLinks()}
        </NavDropdown>
      </Nav>
    );
  }
}

export default Navigation;
