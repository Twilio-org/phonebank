import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.renderSelectOptions = this.renderSelectOptions.bind(this);
    this.onSelect = this.
  }



  renderSelectOptions() {
    return (
      this.props.options.map((option) => {
        return <option key={option.name} value={option.name}>{option.name}</option>
      })
    );
  }

  render() {
    const { options } = this.props;
    return (
      <Field>
      <ButtonToolbar>
        <DropdownButton title="Select an Option">
          {this.renderSelectOptions()}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default Dropdown;
