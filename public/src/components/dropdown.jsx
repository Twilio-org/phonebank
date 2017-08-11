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
          <option
            key={option[prop]}
            value={option[prop]}
          >
            {option[prop]}
          </option>
        )
      )
    );
  }

  render() {
    return (
      <div className="row form-group">
        <label htmlFor={`dropdown-basic-${this.props.id}`}>{this.props.label}</label>
        <select title="Select an Option" id={`dropdown-basic-${this.props.id}`}>
          <option>Select Question</option>
          {this.renderSelectOptions(this.props.keyToUse)}
        </select>
      </div>
    );
  }
}

export default Dropdown;
