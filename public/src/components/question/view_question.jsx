import React, { Component } from 'react';

export default class ViewQuestion extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchQuestion(id);
  }
  render() {
    const { title, description, type, responses } = this.props.question_info;
    return (
      <div>
        <h1>{ title }</h1>
        <p>Description: { description }</p>
        <p>Type: { type }</p>
        <p>Responses: {responses ? responses : 'none'}</p>
        <button>Edit Question</button>
      </div>
    );
  }
}
