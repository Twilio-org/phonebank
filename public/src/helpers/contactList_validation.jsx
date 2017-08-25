export default function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter a name.';
  }
  if (!values.csv) {
    errors.csv = 'Please select a file.';
  }
  if (values.csv && values.csv.type !== 'text/csv') {
    errors.csv = 'Not a valid file type (.csv)';
  }
  return errors;
}
