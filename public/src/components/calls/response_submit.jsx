import { submitCallResponses } from '../../actions/calls';

export default function formSubmission(dispatchInstance) {
  const dispatch = dispatchInstance;
  return function responseSubmit(values) {
    console.log('THISSSS IS THE FORM SUBMIT =================================', values);
    return dispatch(submitCallResponses(values));
  };
}
