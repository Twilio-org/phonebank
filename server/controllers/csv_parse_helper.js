import parse from 'csv-parse/lib/sync';
import { checkObjectProps } from '../../test/client/client_test_helpers';

export default function checkHeaders(uploadedCsv) {
  const csvString = uploadedCsv.data.toString();
  const reqHeaders = ['external_id', 'first_name', 'last_name', 'email', 'phone_number'];
  const csvObjects = parse(csvString, { columns: true, auto_parse: true });
  const [headerCheck] = csvObjects;
  return checkObjectProps(reqHeaders, headerCheck) ? csvObjects : new Error();
}
