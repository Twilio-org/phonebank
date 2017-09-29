import _ from 'lodash';

const chartTemplate = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1
  }]
};

const colorArrayRGBAOpaque = [
  'rgba(230, 25, 75, 0.25)', 'rgba(60, 180, 75, 0.25)', 'rgba(255, 225, 25, 0.25)',
  'rgba(0, 130, 200, 0.25)', 'rgba(245, 130, 49, 0.25)', 'rgba(145, 30, 180, 0.25)',
  'rgba(250, 190, 190, 0.25)', 'rgba(0, 128, 128, 0.25)', 'rgba(230, 190, 255, 0.25)',
  'rgba(170, 110, 40, 0.25)', 'rgba(255, 250, 200, 0.25)', 'rgba(128, 0, 0, 0.25)',
  'rgba(170, 255, 195, 0.25)', 'rgba(128, 128, 0, 0.25)', 'rgba(255, 216, 177, 0.25)',
  'rgba(0, 0, 128, 0.25)', 'rgba(128, 128, 128, 0.25)', 'rgba(0, 0, 0, 0.25)'
];

const colorArrayRGBASolid = [
  'rgba(230, 25, 75, 1)', 'rgba(60, 180, 75, 1)', 'rgba(255, 225, 25, 1)',
  'rgba(0, 130, 200, 1)', 'rgba(245, 130, 49, 1)', 'rgba(145, 30, 180, 1)',
  'rgba(250, 190, 190, 1)', 'rgba(0, 128, 128, 1)', 'rgba(230, 190, 255, 1)',
  'rgba(170, 110, 40, 1)', 'rgba(255, 250, 200, 1)', 'rgba(128, 0, 0, 1)',
  'rgba(170, 255, 195, 1)', 'rgba(128, 128, 0, 1)', 'rgba(255, 216, 177, 1)',
  'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)', 'rgba(0, 0, 0, 1)'
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

function formatResponse(rawResponse) {
  const answerTemplate = _.cloneDeep(chartTemplate);
  const responseLabels = Object.keys(rawResponse.response);
  const responseFreq = responseLabels.map(answer => rawResponse.response[answer]);
  const barColor = colorArrayRGBAOpaque.slice(0, responseLabels.length);
  const borderColor = colorArrayRGBASolid.slice(0, responseLabels.length);
  answerTemplate.labels = responseLabels;
  answerTemplate.datasets[0].data = responseFreq;
  answerTemplate.datasets[0].backgroundColor = barColor;
  answerTemplate.datasets[0].borderColor = borderColor;
  return answerTemplate;
}


export function getQuestionNames(questions) {
  const questionNames = {};
  questions.forEach((question) => {
    questionNames[question.id] = question.title;
  });
  return questionNames;
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
  outcomeTemplate.datasets[0].data = [
    PENDING,
    ANSWERED,
    BAD_NUMBER,
    NO_ANSWER,
    DO_NOT_CALL,
    LEFT_MSG,
    INCOMPLETE
  ];
  outcomeTemplate.datasets[0].backgroundColor = colorArrayRGBASolid.slice(0, outcomeKeys.length);
  return outcomeTemplate;
}

export function statusDataFormat(statusData) {
  const { AVAILABLE, ASSIGNED, IN_PROGRESS, HUNG_UP, ATTEMPTED } = statusData;
  const statusTemplate = _.cloneDeep(chartTemplate);
  const statusKeys = Object.keys(statusData);
  statusTemplate.labels = ['AVAILABLE', 'ASSIGNED', 'IN PROGRESS', 'HUNG UP', 'ATTEMPTED'];
  statusTemplate.datasets[0].data = [AVAILABLE, ASSIGNED, IN_PROGRESS, HUNG_UP, ATTEMPTED];
  statusTemplate.datasets[0].backgroundColor = colorArrayRGBASolid.slice(0, statusKeys.length);
  return statusTemplate;
}

export function responsesDataFormat(responseData) {
  const questionIDs = Object.keys(responseData);
  const responses = questionIDs.map(id => ({ id, response: _.cloneDeep(responseData[id]) }));
  const formatedResponses = responses.map(resp => ({
    id: resp.id,
    formattedResponse: formatResponse({ response: resp.response })
  }));
  return formatedResponses;
}
