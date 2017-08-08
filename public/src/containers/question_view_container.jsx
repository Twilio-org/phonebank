import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class QuestionViewContainer extends Component {
  render() {
    return 'QuestionViewContainer';
  }
}
function mapStateToProps(state) {
  return {};
}
export default withRouter(
  connect(mapStateToProps, null)(QuestionViewContainer)
);
