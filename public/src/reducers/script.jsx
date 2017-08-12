const scriptInfo = {
  id: null,
  name: null,
  body: null,
  description: null
};

export const SET_SCRIPT_INFO = 'SET_SCRIPT_INFO';

export function scriptInfoReducer(state = scriptInfo, action) {
  const { type, payload } = action;
  console.log("payload is: ", payload);
  switch (type) {
    case SET_SCRIPT_INFO:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        body: payload.body,
        description: payload.description
      };
    default:
      return state;
  }
}
