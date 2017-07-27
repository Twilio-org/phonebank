import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    // Bind
    this.renderLinks = this.renderLinks.bind(this);
  }
  // Render all current links
  renderLinks() {
    return (
      this.props.links.map((link) => {
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
        <DropdownButton title={this.props.title} id="menu">
          {this.renderLinks()}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Navigation;
