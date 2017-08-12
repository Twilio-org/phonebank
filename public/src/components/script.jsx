import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchScript } from '../actions/script';

export class ScriptPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.script_info;
    this.props.fetchScript(id);
  }

  render() {
    const { script_info } = this.props;
    const { name, body, description } = script_info;
    return (
      <div>
        <h1>Script Details</h1>
        <h3>Name: {script_info ? name : ''}</h3>
        <h3>Body: {script_info ? body : ''}</h3>
        <h3>Description: {script_info ? description : ''}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { script_info: state.script_info };
}

export default withRouter(
  connect(mapStateToProps, { fetchScript })(ScriptPage)
);
