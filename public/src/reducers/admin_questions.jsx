export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_QUESTION_CURRENT = 'SET_QUESTION_CURRENT';

const defaultQuestions = {
  current_question: {},
  all_questions: []
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
    default:
      return state;
  }
}
