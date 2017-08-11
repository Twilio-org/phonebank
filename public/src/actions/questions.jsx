import axios from 'axios';

export default function createQuestion(questionInfo, history) {
  const { title, description } = questionInfo;
  const type = questionInfo.type.toLowerCase();
  // Create single string for all options
  const keys = Object.keys(questionInfo);
  const options = keys.filter(key => key.indexOf('option') >= 0);
  let responses = '';
  if (options.length > 0) {
    responses = options.reduce((response, option) => `${response + questionInfo[option]},`, responses);
  }
  return () => axios.post('/questions', {
    title,
    description,
    type,
    responses
  })
  .then((res) => {
    // history.push('../');
    console.log(res);
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in creating new questions to db: ${err}`,
      name: 'createQuestion function error in actions/questions.jsx'
    };
    throw customError;
  });
}
