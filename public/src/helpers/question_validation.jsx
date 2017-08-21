export default function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Please enter a question title.';
  }
  if (!values.description) {
    errors.description = 'Please enter a question description.';
  }
  if (values.type === 'select') {
    errors.type = 'Please select a question type.';
  }
  return errors;
}
