const scriptInfo = {
  name: null,
  body: null,
  description: null
};

const scriptQuestions = [];

export const SET_SCRIPT_INFO = 'SET_SCRIPT_INFO';
export const SET_SCRIPT_QUESTIONS = 'SET_SCRIPT_QUESTIONS';

export function scriptInfoReducer(state = scriptInfo, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SCRIPT_INFO:
      return {
        ...state,
        name: payload.name,
        body: payload.body,
        description: payload.description
      };
    default:
      return state;
  }
}

export function scriptQuestionsReducer(state = scriptQuestions, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SCRIPT_QUESTIONS:
      return {
        ...state,
        questions: payload
      };
    default:
      return state;
  }
}
