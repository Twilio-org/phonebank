import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Doughnut, Bar, HorizontalBar } from 'react-chartjs-2';
import { chartOptions } from '../../helpers/metrics_template';

const CampaignDataVis = (props) => {
  const { outcomeData, statusData, responsesData, questionNames } = props;

  return (
    <div>
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
};

CampaignDataVis.displayName = 'CampaignDataVis';
export default CampaignDataVis;
