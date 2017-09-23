export default function validate(values) {
  const errors = {};
  if (!values.contact_lists_id || values.contact_lists_id.indexOf('Select') === 0) {
    errors.contact_lists_id = 'Please select a contact list.';
  }
  if (!values.script_id || values.script_id.indexOf('Select') === 0) {
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
