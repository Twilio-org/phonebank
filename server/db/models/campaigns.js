import db from '../db';
import User from './users';
import Call from './calls';
import Response from './responses';

export default db.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true,
  users() {
    return this.belongsToMany(User);
  },
  calls() {
    return this.hasMany(Call);
  },
  responses() {
    return this.hasMany(Response).through(Call);
  },
  getExport() {
    // getExport should only be called on campaigns that were loaded with related calls.responses
    const calls = this.relations.calls;

    // some records have duplicate props, this renames the props and returns
    // a version of the object that no longer has the duplicate prop name.
    function samePropProcessing(object, objectType, propName, index) {
      // create a copy because linter likes functional
      const cloneObject = object;
      if (index) {
        // if we're given an index, it's for naming purposes, use it
        cloneObject[`${objectType}_${index}_${propName}`] = cloneObject[propName];
      } else {
        cloneObject[`${objectType}_${propName}`] = cloneObject[propName];
      }
      // delete the potential duplicate prop name
      delete cloneObject[propName];
      return cloneObject;
    }
    // this will be an accumulator that will collect csv headers from record keys
    let headers = [];
    // make an array of strings that are lines in the csv.
    const joined = calls.map((call) => {
      const responses = call.relations.responses;
      // this variable will hold the complete record for one line in the csv
      // but we want to set it conditionally
      let record;
      // reassign the cloned call with each processing to keep it clean as we go.
      let callClone = samePropProcessing(call.attributes, 'call', 'id');
      callClone = samePropProcessing(callClone, 'call', 'updated_at');
      callClone = samePropProcessing(callClone, 'call', 'created_at');

      if (responses.length > 0) {
        // make an array of processed response objects from our array of response models.
        const responsesClone = responses.models.map((response, index) => {
          let responseClone = samePropProcessing(response.attributes, 'response', 'id', index + 1);
          responseClone = samePropProcessing(responseClone, 'response', 'updated_at', index + 1);
          responseClone = samePropProcessing(responseClone, 'response', 'created_at', index + 1);
          responseClone = samePropProcessing(responseClone, 'response', 'response', index + 1);
          responseClone = samePropProcessing(responseClone, 'response', 'question_id', index + 1);
          // since these will be merged with a call object, we'll already have call_id
          delete responseClone.call_id;
          return responseClone;
        });
        // add the cloned call to the front of the array before we pass the
        // array as a set of arguments
        responsesClone.unshift(callClone);
        // set our record to a merged version of the processed call and its associated responses.
        record = Object.assign.apply(null, responsesClone);
      } else {
        // if there were no responses the processed call is all we return.
        record = callClone;
      }
      const keys = Object.getOwnPropertyNames(record);
      // merge record keys into our headers array
      headers = Object.assign(headers, keys);
      // join the record values into a string, comma seperated. This creates our csv
      // record line. This is the return of the calls.map function.
      return keys.map(key => record[key]).join(',');
    });
    // join the headers array into a string, comma-delimited and unshift it
    // onto the front of the array of line-strings as the first line in a csv
    // are the headers
    joined.unshift(headers.join(','));
    // join the array of strings that represent lines in the csv, new-line-delimited
    // and this single string is the csv, so return it.
    return joined.join('\n');
  }
});
