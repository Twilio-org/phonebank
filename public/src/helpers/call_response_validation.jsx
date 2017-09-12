export default function validateCall(values) {
  const errors = {};
  if (!values.outcome) {
    errors.outcome = 'Please select an option';
  }
  return errors;
}
