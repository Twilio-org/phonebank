import * as chai from 'chai';
import fs from 'fs';
import path from 'path';
import { validateParseCSV, extraHeadersError as extraHeaders, missingHeadersError as missingHeaders } from '../../../server/util/csv_valid_parse';

const checkObjectProps = (expectedProps, obj) => {
  return expectedProps.reduce((accum, curr) => {
    const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
    return accum && propertyExists;
  }, true);
};

const paths = {
  extraHeaders: 'extra_headers_contact_list.csv',
  missingHeaders: 'missing_header_contact_list.csv',
  completeHeaders: 'contact_list.csv'
};

const { extraHeaders: extra, missingHeaders: missing, completeHeaders: complete } = paths;

const mockBufferExtraHeaders = fs.readFileSync(path.resolve(__dirname, extra));
const mockBufferMissingHeader = fs.readFileSync(path.resolve(__dirname, missing));
const mockBuffer = fs.readFileSync(path.resolve(__dirname, complete));

const { expect, Should, assert } = chai;

describe('CSV validation and parsing helper function tests: ', () => {
  console.log('now running CSV validation tests: ');
  describe('validation error handling: ', () => {
    const missingHeaders = new Error('missing required header(s): email');
    const extraHeadersError = new Error('extraneous headers, limit to: external_id, first_name, last_name, email, phone_number');
    it('when passed a csv with headers missing, it should throw the "missingHeaders error" ', (done) => {
      validateParseCSV({ data: mockBufferMissingHeader })
        .then((contactObjs) => {
          expect(contactObjs).to.equal(undefined);
        })
        .catch((err) => {
          expect(JSON.stringify(err)).to.equal(JSON.stringify(missingHeaders));
        });
      done();
    });
    it('should throw "extraHeaders" error when passed a CSV with too many headers: ', (done) => {
      validateParseCSV({ data: mockBufferExtraHeaders })
        .then((contactObjs) => {
          expect(contactObjs).to.equal(undefined);
        })
        .catch((err) => {
          expect(JSON.stringify(err)).to.equal(JSON.stringify(extraHeaders));
        });
      done();
    });
  });
  describe('CSV validation returns with no errors: ', () => {
    const expectedResults = [
      { external_id: 1,
        first_name: 'andi',
        last_name: 'onetoo',
        email: 'test@aol.com',
        phone_number: 1231231234
      },
      { external_id: 2,
        first_name: 'renee',
        last_name: 'oneto',
        email: 'test@aol.com',
        phone_number: 1231231234
      },
      { external_id: 3,
        first_name: 'alyse',
        last_name: 'onetoe',
        email: 'test@aol.com',
        phone_number: 1231231234
      },
      { external_id: 4,
        first_name: 'bradley',
        last_name: 'ontoo',
        email: 'test@aol.com',
        phone_number: 1231231234
      },
      { external_id: 5,
        first_name: 'beverly',
        last_name: 'onetwo',
        email: 'test@aol.com',
        phone_number: 1231231234
      },
      { external_id: 6,
        first_name: 'william',
        last_name: 'ohntoo',
        email: 'test@aol.com',
        phone_number: 1231231234
      }
    ];
    const expectedProps = Object.keys(expectedResults[0]);
    validateParseCSV({ data: mockBuffer })
      .then((contactObjs) => {
        it('should return an array: ', (done) => {
          expect(Array.isArray(contactObjs)).to.equal(true);
          done();
        });
        it('should be an array of objects: ', (done) => {
          const areAllObjects = contactObjs.reduce((accum, curr) => {
            return accum && typeof curr === 'object' && !Array.isArray(curr);
          }, true);
          expect(areAllObjects).to.equal(true);
          done();
        });
        it('should have all of the expected properties in each object', (done) => {
          const [first] = contactObjs;
          const firstHasCorrectProps = checkObjectProps(expectedProps, first);
          const allHaveSameProps = contactObjs.reduce((accum, curr) => {
            return JSON.stringify(Object.keys(curr)) === JSON.stringify(expectedProps);
          }, true);
          expect(firstHasCorrectProps && allHaveSameProps).to.equal(true);
          done();
        });
      });
  });
  console.log('CSV parsing header validation tests are complete');
});
