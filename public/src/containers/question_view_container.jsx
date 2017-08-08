import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionView from '../components/question_view';

class QuestionViewContainer extends Component {
  render() {
    const props = {}; // should be grabbing from store via connect
    return (
      <QuestionView {...props} />
    );
  }
}
function mapStateToProps(state) {
  return { state };
}
export default withRouter(
  connect(mapStateToProps, null)(QuestionViewContainer)
);
