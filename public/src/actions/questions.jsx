import axios from 'axios';

export default function createQuestion(questionInfo, history) {
  const { title, description, type } = questionInfo;
  let responses = '';
  // refactor responses later
  if (questionInfo.option1 && questionInfo.option2 &&
    questionInfo.option3 && questionInfo.option4 &&
    questionInfo.option5) {
    responses = `${questionInfo.option1},${questionInfo.option2},${questionInfo.option3},${questionInfo.option4},${questionInfo.option5}`;
  }
  console.log('THIS IS RESPONSES FROM ACTION \n ====================================== \n', responses);
  return () => axios.post('/questions', {
    title,
    description,
    type,
    responses
  })
  .then((res) => {
    history.push('/');
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
