import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLinks: props.links() // grab passed links from props
    };
    // Bind
    this.renderLinks = this.renderLinks.bind(this);
  }
  // Render all current links
  renderLinks() {
    return (
      this.state.currentLinks.map((link, i) => {
        return <MenuItem eventKey={i + 1} key={link.title} href={link.href}>{link.title}</MenuItem>
      })
    );
  }
  render() {
    return (
      <ButtonToolbar>
        <DropdownButton title="Menu" id="menu">
          {this.renderLinks()}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Navigation;
