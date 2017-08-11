import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.renderSelectOptions = this.renderSelectOptions.bind(this);
  }

  renderSelectOptions(prop) {
    return (
      this.props.options.map(option =>
        (
          <MenuItem
            key={option[prop]}
            eventKey={option[prop]}
            value={option[prop]}
          >
            {option[prop]}
          </MenuItem>
        )
      )
    );
  }

  render() {
    return (
      <div className="row form-group">
        <label htmlFor={`dropdown-basic-${this.props.id}`}>{this.props.label}</label>
        <DropdownButton title="Select an Option" id={`dropdown-basic-${this.props.id}`}>
          <div>
            {this.renderSelectOptions(this.props.keyToUse)}
          </div>
        </DropdownButton>
      </div>
    );
  }
}

export default Dropdown;
