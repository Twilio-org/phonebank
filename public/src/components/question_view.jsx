import React, { Component } from 'react';

export default class QuestionView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchQuestion(id);
  }
  render() {
    return (
      <div>
        <h1>This is a question</h1>
        <p></p>
      </div>
    );
  }
}
