import * as chai from 'chai';
import fs from 'fs';
import path from 'path';
import csvValidation from '../../../server/util/csv_valid_parse';

const mockBufferExtraHeaders = fs.readFileSync(path.resolve(__dirname, 'extra_headers_contact_list.csv'));
const mockBufferMissingHeader = fs.readFileSync(path.resolve(__dirname, 'missing_header_contact_list.csv'));
const mockBuffer = fs.readFileSync(path.resolve(__dirname, 'contact_list.csv'));

const { expect, should } = chai;

describe('CSV validation and parsing helper function tests: ', () => {
  // csvValidation({data: mockBuffer})
  //   .then(list => console.log('meow result', list))
  //   .catch(err => console.log('meow error', err));
  // describe error handling (missing header and extra header)
  // describe successful passoff of objects
});
