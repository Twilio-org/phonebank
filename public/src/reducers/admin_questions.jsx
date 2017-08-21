export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_QUESTION_CURRENT = 'SET_QUESTION_CURRENT';
export const SET_QUESTION = 'SET_QUESTION';

export const defaultQuestions = {
  current_question: {},
  all_questions: [],
  question_info: {}
};

export function adminQuestionsReducer(state = defaultQuestions, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_QUESTIONS:
      return {
        ...state,
        all_questions: payload
      };
    case SET_QUESTION_CURRENT:
      return {
        ...state,
        current_question: payload
      };
    case SET_QUESTION:
      return {
        ...state,
        question_info: payload
      };
    default:
      return state;
  }
}
