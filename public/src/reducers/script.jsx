export const defaultScriptQuestions = [];

export const SET_SCRIPT_QUESTIONS = 'SET_SCRIPT_QUESTIONS';

export function scriptQuestionsReducer(state = defaultScriptQuestions, action) {
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
