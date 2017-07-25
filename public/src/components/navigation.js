import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class Navigation extends Component{
  render() {
    return (
      <ButtonToolbar>
        <DropdownButton title="Menu" id="menu">
          <MenuItem eventKey="1" href="/registration">
            Register
          </MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Navigation;
