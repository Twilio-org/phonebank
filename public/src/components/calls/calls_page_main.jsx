import React, { Component } from 'react';

export default class CallsPageMain extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>Meow, this is the main call page, where we can make calls!</div>
    );
  }
}
