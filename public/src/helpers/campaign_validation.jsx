export default function validate(values) {
  const errors = {};
  if (!values.contact_lists_id) {
    errors.contact_lists_id = 'Please select a contact list.';
  }
  if (!values.script_id) {
    errors.script_id = 'Please select a script.';
  }
  if (!values.title) {
    errors.title = 'Please enter a title';
  }
  if (!values.description) {
    errors.description = 'Please enter a description.';
  }
  if (!values.name) {
    errors.name = 'Please select a name';
  }
  return errors;
}
