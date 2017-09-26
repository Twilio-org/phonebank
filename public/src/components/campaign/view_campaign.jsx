import React, { Component } from 'react';
import { Button, Row, Col, ButtonToolbar } from 'react-bootstrap';
import { outcomeDataFormat, statusDataFormat, responsesDataFormat, getQuestionNames } from '../../helpers/metrics_template';
import CampaignDataVis from './outcome_status_dist';

export default class ViewCampaign extends Component {
  constructor(props) {
    super(props);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleViewScriptClick = this.handleViewScriptClick.bind(this);
  }
  componentDidMount() {
    if (this.props.admin_campaigns === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchCampaign(id);
      this.props.fetchCampaignMetrics(id);
    }
  }

  handleCancelClick() {
    const { clearCurrentCampaignMetrics, history } = this.props;
    history.goBack();
    clearCurrentCampaignMetrics();
  }

  handleViewScriptClick() {
    const { history, current_campaign } = this.props;
    const { script_id } = current_campaign;
    history.push({ pathname: `/admin/scripts/${script_id}` });
  }

  render() {
    const { current_campaign,
            current_campaign_metrics,
            current_script,
            current_questions } = this.props;
    const { name, title, status, description } = current_campaign;
    const { name: scriptName } = current_script;
    const campaginId = current_campaign.id;
    let outcomeData;
    let statusData;
    let responsesData;
    let questionNames;
    if (current_campaign_metrics.metricsObj) {
      outcomeData = outcomeDataFormat(current_campaign_metrics.metricsObj.outcome_distribution);
      statusData = statusDataFormat(current_campaign_metrics.metricsObj.status_distribution);
      responsesData = responsesDataFormat(current_campaign_metrics.metricsObj.response_stats);
    }
    if (current_questions && current_questions.length) {
      questionNames = getQuestionNames(current_questions);
    }
    return (
      <div>
        <Row>
          <Col md={12}>
            <h1>{current_campaign ? name : null } Campaign Details</h1>
            <h4>Title:</h4>
            {current_campaign ? (<p>{title}</p>) : null}
            <h4>Status:</h4>
            {current_campaign ? (<p>{status}</p>) : null}
            <h4>Description:</h4>
            {current_campaign ? (<p>{description}</p>) : null}
            <h4>Script Name:</h4>
            {current_script ? (<p>{scriptName}</p>) : null}
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                onClick={this.handleViewScriptClick}
              >
                View Script
              </Button>
              <Button
                bsStyle="primary"
                onClick={this.handleCancelClick}
              >
                Cancel
              </Button>
              <a className="btn btn-primary" target="_blank" href={`/campaigns/${campaginId}/csv`}>Download CSV</a>
            </ButtonToolbar>
          </Col>
        </Row>
        {status && status !== 'draft' ? (
          <CampaignDataVis
            outcomeData={outcomeData}
            statusData={statusData}
            responsesData={responsesData}
            questionNames={questionNames}
          />
          ) : (
            <Row>
              <Col md={12}>
                <div
                  className="alert alert-warning"
                  role="alert"
                >
                  Campaign still in draft, no stats available.
                </div>
              </Col>
            </Row>
          )}
      </div>
    );
  }
}
