import React, { Component } from 'react';
import QuestionList from './script_question_list';

export default class ScriptPage extends Component {
  // constructor(props) {
  //   super(props);
  //   const { current_script } = this.props.admin_scripts.current_script;
  // }

  componentDidMount() {
    console.log("Current script should be: ", this.props.admin_scripts.current_script);
    // const { current_script } = this.props.admin_scripts;
    if (this.props.admin_scripts.current_script === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchScript(id);
      this.props.fetchScriptQuestions(id);
    }
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
          {questions ? questions.map(question => (
            <QuestionList
              key={question.id}
              question={question}
            />
          )) : null}
        </ol>
      </div>
    );
  }
}


  // handleRedirectClick() {
  //   const { history } = this.props;
  //   const { id } = this.props.match.params;
  //   history.push(`/admin/scripts/${id}`);
  // }
