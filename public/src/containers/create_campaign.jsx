import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, destroy } from 'redux-form';

import CampaignPage from '../components/campaign/campaign';

import { saveNewCampaign } from '../actions/campaign';
import { fetchAllContactLists } from '../actions/admin_contact_lists';
import { fetchAllScripts } from '../actions/admin_scripts';
import validate from '../helpers/campaign_validation';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    scripts: state.admin_scripts.all_scripts,
    contact_lists: state.admin_contact_lists.contact_lists
  };
}

export default withRouter(
  reduxForm({
    form: 'CampaignPage',
    validate,
    destroyOnUnmount: false
  })(
    connect(mapStateToProps,
      {
        saveNewCampaign,
        fetchAllScripts,
        fetchAllContactLists,
        destroy
      }
    )(CampaignPage)
  )
);
