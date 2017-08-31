import React, { Component } from 'react';

export default class CallPage extends Component {
  componentDidMount() {
    console.log(props);
    const { current_campaign } = this.props;
    /// dispatch fetch current campaign and related info 
  }

  render() {
    return (
      <div />
    )
  }
}
