import React, { Component } from 'react';

export default class ScriptPage extends Component {
  constructor(props) {
    super(props);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { script_id } = this.props;
    this.props.fetchScript(script_id);
    this.props.fetchScriptQuestions(script_id);
  }

  renderQuestions() {
    const { questions } = this.props;
    return questions.map(question =>
      (<li key={question.id}>{question.title}
        <ul key={question.title}>
          <li key="description">Description: {question.description}</li>
          <li key="type">Type: {question.type}</li>
          <li key="responses">Responses: {question.responses ? question.responses : 'Text Paragraph'}</li>
        </ul>
      </li>));
  }

  render() {
    const { script_info, questions } = this.props;
    const { name, body, description } = script_info;
    return (
      <div>
        <h1>{script_info ? name : null} Script Details</h1>
        <h4>Body:</h4>
        {script_info ? (<p>{body}</p>) : null}
        <h4>Description:</h4>
        {script_info ? (<p>{description}</p>) : null}
        <h4>Questions:</h4>
        <ol>
          {questions ? this.renderQuestions() : null}
        </ol>
      </div>
    );
  }
}
