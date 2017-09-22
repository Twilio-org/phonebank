import _ from 'lodash';

const chartTemplate = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    backgroundColor: []
  }]
};

const colorArrayHex = [
  '#e6194b', '#3cb44b', '#ffe119',
  '#0082c8', '#f58231', '#911eb4',
  '#fabebe', '#008080', '#e6beff',
  '#aa6e28', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1',
  '#000080', '#808080', '#000000'
];

export const chartOptions = {
  outcomeDoughnut: {
    legend: {
      position: 'left'
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    }
  },
  statusBar: {
    responsive: true,
    maintainAspectRatio: true,
    xAxisID: 'status',
    yAxisID: 'frequency',
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    }
  },
  responseBar: {
    responsive: true,
    maintainAspectRatio: true,
    xAxisID: 'response',
    yAxisID: 'resp-frequency',
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 5,
        right: 5
      }
    }
  }
};


function removeUnderscore(array) {
  return array.map(word => word.split('_').join(' '));
}

function formatResponse(response) {
  const answerTemplate = _.cloneDeep(chartTemplate);
  const responseLabels = Object.keys(response);
  const responseFreq = responseLabels.map(answer => response[answer]);
  const barColor = colorArrayHex.slice(0, responseLabels.length);
  answerTemplate.labels = responseLabels;
  answerTemplate.datasets[0].data = responseFreq;
  answerTemplate.datasets[0].label = '[insert question title]';
  answerTemplate.datasets[0].backgroundColor = barColor;
  return answerTemplate;
}

export function outcomeDataFormat(outcomeData) {
  const { PENDING,
          BAD_NUMBER,
          ANSWERED,
          NO_ANSWER,
          DO_NOT_CALL,
          LEFT_MSG,
          INCOMPLETE } = outcomeData;
  const outcomeTemplate = _.cloneDeep(chartTemplate);
  const outcomeKeys = Object.keys(outcomeData);
  outcomeTemplate.labels = removeUnderscore(outcomeKeys);
  outcomeTemplate.datasets.label = 'Call Outcome Distribution';
  outcomeTemplate.datasets[0].data = [
    PENDING,
    BAD_NUMBER,
    ANSWERED,
    NO_ANSWER,
    DO_NOT_CALL,
    LEFT_MSG,
    INCOMPLETE
  ];
  outcomeTemplate.datasets[0].backgroundColor = colorArrayHex.slice();
  return outcomeTemplate;
}

export function statusDataFormat(statusData) {
  const { AVAILABLE, ASSIGNED, IN_PROGRESS, HUNG_UP, ATTEMPTED } = statusData;
  const statusTemplate = _.cloneDeep(chartTemplate);
  const statusKeys = Object.keys(statusData);
  statusTemplate.labels = ['AVAILABLE', 'ASSIGNED', 'IN PROGRESS', 'HUNG UP', 'ATTEMPTED'];
  statusTemplate.datasets[0].label = 'Call Status Distribution';
  statusTemplate.datasets[0].data = [AVAILABLE, ASSIGNED, IN_PROGRESS, HUNG_UP, ATTEMPTED];
  statusTemplate.datasets[0].backgroundColor = colorArrayHex.slice(0, statusKeys.length);
  return statusTemplate;
}

export function responsesDataFormat(responseData) {
  const questionIDs = Object.keys(responseData);
  const responses = questionIDs.map(id => _.cloneDeep(responseData[id]));
  const formatedResponses = responses.map(resp => formatResponse(resp));
  return formatedResponses;
}
