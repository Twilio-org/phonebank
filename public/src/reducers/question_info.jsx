const questionInfo = {
  title: null,
  description: null,
  type: null,
  responses: null
};

export const SET_QUESTION_INFO = 'SET_QUESTION_INFO';

export function questionInfoReducer(state = questionInfo, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_QUESTION_INFO:
      return {
        ...state,
        title: payload.title,
        description: payload.description,
        type: payload.type,
        responses: payload.responses
      };
    default:
      return state;
  }
}
