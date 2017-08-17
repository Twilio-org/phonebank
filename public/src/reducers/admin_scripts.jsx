export const SET_SCRIPTS = 'SET_SCRIPTS';
export const SET_SCRIPT_CURRENT = 'SET_SCRIPT_CURRENT';

export const defaultScripts = {
  current_script: {},
  all_scripts: []
};

export function adminScriptsReducer(state = defaultScripts, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SCRIPTS:
      return {
        ...state,
        all_scripts: payload
      };
    case SET_SCRIPT_CURRENT:
      return {
        ...state,
        current_script: payload
      };
    default:
      return state;
  }
}
