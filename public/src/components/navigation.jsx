import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    // Bind
    this.logoutOnClick = this.logoutOnClick.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
  }
  logoutOnClick() {
    const { history } = this.props;
    this.props.logout(history);
  }
  // Render all current links
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
      <ButtonToolbar>
        <DropdownButton title={this.props.title ? this.props.title : ''} id="menu">
          {this.renderLinks()}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Navigation;
