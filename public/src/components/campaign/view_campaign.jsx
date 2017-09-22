import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Doughnut, Bar, HorizontalBar } from 'react-chartjs-2';
import { outcomeDataFormat, statusDataFormat, responsesDataFormat, chartOptions, getQuestionNames } from '../../helpers/metrics_template';

export default class ViewCampaign extends Component {
  componentDidMount() {
    if (this.props.admin_campaigns === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchCampaign(id);
      this.props.fetchCampaignMetrics(id);
    }
  }

  render() {
    const { current_campaign,
            current_campaign_metrics,
            current_script,
            current_questions,
            history } = this.props;
    const { name, title, status, description, script_id } = current_campaign;
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
          <Col md="12">
            <h1>{current_campaign ? name : null } Campaign Details</h1>
            <h4>Title:</h4>
            {current_campaign ? (<p>{title}</p>) : null}
            <h4>Status:</h4>
            {current_campaign ? (<p>{status}</p>) : null}
            <h4>Description:</h4>
            {current_campaign ? (<p>{description}</p>) : null}
            <h4>Script Name:</h4>
            {current_script ? (<p>{scriptName}</p>) : null}
            <Button
              bsStyle="primary"
              onClick={() => { history.push({ pathname: `/admin/scripts/${script_id}` }); }}
            >
              View Script
            </Button>
            <Button
              bsStyle="primary"
              onClick={history.goBack}
            >
              Cancel
            </Button>
            <a className="btn btn-primary" target="_blank" href={`/campaigns/${campaginId}/csv`}>Download CSV</a>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h3>Call Outcome Distribution</h3>
            <Doughnut
              data={outcomeData}
              options={chartOptions.outcomeDoughnut}
            />
          </Col>
          <Col md="6">
            <h3>Call Status Distribution</h3>
            <HorizontalBar
              data={statusData}
              options={chartOptions.statusBar}
            />
          </Col>
        </Row>
        <h3>Single Choice and Multi-select Responses Distribution</h3>
        { (responsesData && responsesData.length) ?
          (
            <Row>
              {responsesData.map((resp, index) =>
                (
                  <Col md="4" key={resp.formattedResponse.labels[0].concat(index)}>
                    <h4>{questionNames[resp.id]}</h4>
                    <Bar
                      data={resp.formattedResponse}
                      options={chartOptions.responseBar}
                    />
                  </Col>
                )
              )}
            </Row>
          ) : (<Row />)
        }
      </div>
    );
  }
}
