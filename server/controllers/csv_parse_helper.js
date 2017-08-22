import parse from 'csv-parse/lib/sync';
import { checkObjectProps } from '../../test/client/client_test_helpers';

function customError(name, message) {
  const error = { error: name, message };
  throw error;
}

export default function parseCSVThenValidateHeaders(uploadedCsv) {
  const csvString = uploadedCsv.data.toString();
  const reqHeaders = ['external_id', 'first_name', 'last_name', 'email', 'phone_number'];
  const csvObjects = parse(csvString, { columns: true, auto_parse: true });
  const [headerCheck] = csvObjects;
  return checkObjectProps(reqHeaders, headerCheck) ? csvObjects : customError('invalid headers', `missing one of the required headers: ${reqHeaders.join(', ')}`);
}

// NOTE: may want to change to an async call (cb for db service calls)... or not
// in controller: import the helper and invoke on 'uploadedCsv'
// if results in error (e.g. not an array of objs), then return error
