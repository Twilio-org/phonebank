import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import QuestionList from './script_question_list';

export default class ScriptPage extends Component {

  componentDidMount() {
    if (this.props.admin_scripts === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchScript(id);
      this.props.fetchScriptQuestions(id);
    } else {
      const { id } = this.props.admin_scripts.current_script;
      this.props.fetchScriptQuestions(id);
    }
  }

  render() {
    const { questions, current_script, history } = this.props;
    const { name, body, description } = current_script;
    return (
      <div>
        <h1>{current_script ? name : null} Script Details</h1>
        <h4>Body:</h4>
        {current_script ? (<p>{body}</p>) : null}
        <h4>Description:</h4>
        {current_script ? (<p>{description}</p>) : null}
        <h4>Questions:</h4>
        <ol>
          {questions ? questions.map(question => (
            <QuestionList
              key={question.id}
              question={question}
            />
          )) : null}
        </ol>
        <Button
          bsStyle="primary"
          onClick={history.goBack}
        >
          Cancel
        </Button>
      </div>
    );
  }
}
