const questions = [];

export const SET_SCRIPT_FORM_QUESTION_OPTIONS = 'SET_SCRIPT_FORM_QUESTION_OPTIONS';

export function questionOptionsReducer(state = questions, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SCRIPT_FORM_QUESTION_OPTIONS:
      return {
        ...state,
        questionsOptions: payload.questions
      };
    default:
      return state;
  }
}
