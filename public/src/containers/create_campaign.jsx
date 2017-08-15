import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import CampaignPage from '../components/campaign/campaign';

import { saveNewCampaign } from '../actions/campaign';
import { fetchAllScripts, fetchAllContactLists } from '../actions/campaign_form';

// TODO: write validation that is applicable to campaign creation!
// // e.g. check input length, checking uniqueness, etc

function validate(values) {
  const errors = {};
  const { password, password_confirm } = values;
  if (!!password && !!password_confirm && password !== password_confirm) {
    errors.password_confirm = 'the passwords must match.';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    scripts: state.campaign_form.scripts,
    contact_lists: state.campaign_form.contact_lists
  };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'CampaignPage',
    destroyOnUnmount: false
  })(
    connect(mapStateToProps,
      {
        saveNewCampaign,
        fetchAllScripts,
        fetchAllContactLists
      }
    )(CampaignPage)
  )
);
