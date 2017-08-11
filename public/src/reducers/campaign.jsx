const scripts = [];

export const SET_CAMPAIGN_FORM_SCRIPT_OPTIONS = 'SET_CAMPAIGN_FORM_SCRIPT_OPTIONS';

export function scriptOptionsReducer(state = scripts, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_FORM_SCRIPT_OPTIONS:
      return {
        ...state,
        scriptOptions: payload
      };
    default:
      return state;
  }
}
