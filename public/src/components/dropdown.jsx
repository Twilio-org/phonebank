import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.renderSelectOptions = this.renderSelectOptions.bind(this);
  }

  renderSelectOptions() {
    return (
      this.props.options.map((option, index) => {
        return <MenuItem key={index} eventKey={option.title} value={option.title}>{option.title}</MenuItem>
      })
    );
  }

  render() {
    console.log('this.props.options is: ', this.props.options);
    return (
        <div className="row form-group">
          <label>{this.props.label}</label>
          <DropdownButton title="Select an Option" id={`dropdown-basic-${this.props.id}`}>
            <div>
              {this.renderSelectOptions()}
            </div>
          </DropdownButton>
        </div>
    );
  }
}
// Update above MenuItems to user question data from the backend through SelectOptions()

// {this.renderSelectOptions}

export default Dropdown;
