import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Doughnut, Bar, HorizontalBar } from 'react-chartjs-2';
import { outcomeDataFormat, statusDataFormat, responsesDataFormat, chartOptions } from '../../helpers/metrics_template';

export default class ViewCampaign extends Component {


  componentDidMount() {
    if (this.props.admin_campaigns === undefined) {
      const { id } = this.props.match.params;
      this.props.fetchCampaign(id);
      this.props.fetchCampaignMetrics(id);
    }
  }

  render() {
    const metrics = {
      "message": "metrics generated successfully",
      "metricsObj": {
        "status_distribution": {
          "AVAILABLE": 43,
          "ASSIGNED": 3,
          "IN_PROGRESS": 2,
          "HUNG_UP": 9,
          "ATTEMPTED": 11
        },
        "outcome_distribution": {
          "PENDING": 43,
          "ANSWERED": 5,
          "BAD_NUMBER": 3,
          "DO_NOT_CALL": 6,
          "LEFT_MSG": 9,
          "NO_ANSWER": 3,
          "INCOMPLETE": 11
        },
        "response_stats": {
          "1": {
            "resp1": 3,
            "resp2": 1,
            "resp3": 0,
            "resp4": 0,
            "resp5": 1
          },
          "3": {
            "resp1": 3,
            "resp2": 4,
            "resp3": 1,
            "resp4": 3,
            "resp5": 2
          },
          "0": {
            "resp1": 4,
            "resp2": 11,
            "resp3": 9,
            "resp4": 4,
            "resp5": 8,
            "resp6": 8,
            "resp7": 8,
          }
        }
      }
    };
    const outcomeData = outcomeDataFormat(metrics.metricsObj.outcome_distribution);
    const statusData = statusDataFormat(metrics.metricsObj.status_distribution);
    const responsesData = responsesDataFormat(metrics.metricsObj.response_stats);
    const { current_campaign, current_script, history } = this.props;
    const { name, title, status, description, script_id } = current_campaign;
    const { name: scriptName } = current_script;
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
        <Row>
          {responsesData.map((resp, index) =>
            (
              <Col md="4" key={resp.labels[0].concat(index)}>
                <h4>[INSERT QUESTION]</h4>
                <Bar
                  data={resp}
                  options={chartOptions.responseBar}
                />
              </Col>
            )
          )}
        </Row>
      </div>
    );
  }
}
