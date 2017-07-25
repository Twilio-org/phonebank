import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component{
  render() {
    return (
      <ButtonToolbar>
        <DropdownButton title="Menu" id="menu">
          <MenuItem eventKey="1" href="/registration">Register</MenuItem>
          <MenuItem eventKey="2" href="/login">Login</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Navigation;
