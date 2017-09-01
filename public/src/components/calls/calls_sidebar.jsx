import React, { Component } from 'react';

export default class CallsSideBar extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>Meow, this is the calls sidebar~!</div>
    );
  }
}
