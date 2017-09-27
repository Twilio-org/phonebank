import React, { Component } from 'react';
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
    const { history } = this.props;
    return (
      this.props.links.map((link) => {
        if (link.href === '/logout') {
          return <MenuItem key={link.title} onClick={this.logoutOnClick}>{link.title}</MenuItem>;
        }
        return (
          <MenuItem key={link.title} onClick={() => history.push(link.href)}>{link.title}</MenuItem>
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
