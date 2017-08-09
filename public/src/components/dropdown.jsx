import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.renderSelectOptions = this.renderSelectOptions.bind(this);
  }

  renderSelectOptions() {
    return (
      this.props.options.map((option) => {
        return <MenuItem eventKey={option.name} value={option.name}>{option.name}</MenuItem>
      })
    );
  }

  render() {
    return (
        <div className="row form-group">
          <label>{this.props.label}</label>
          <DropdownButton title="Select an Option" id={`dropdown-basic-${this.props.id}`}>
            <MenuItem eventKey='1'>meow</MenuItem>
            <MenuItem eventKey='2'>woof</MenuItem>
          </DropdownButton>
        </div>
    );
  }
}
// Update above MenuItems to user question data from the backend through SelectOptions()

// {this.renderSelectOptions}

export default Dropdown;
