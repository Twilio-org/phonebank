import { submitCallResponses } from '../../actions/calls';

export default function responseSubmit(values) {
  console.log('THISSSS IS THE FORM SUBMIT =================================', values);
  submitCallResponses(values);
}
