import parse from 'csv-parse/lib/sync';

// promisified helper function, example usage:
// parseCSVThenValidateHeaders()
//  .then(objsArray => console.log(objsArray))
//  .catch(err => console.log(err));

// NOTE: default export ==> you can name this whatever you'd like

function validateRequiredHeaders(actualHeadersArray) {
  const reqHeaders = {
    external_id: false,
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false
  };
  const missing = [];
  const reqHeadersProps = Object.keys(reqHeaders);
  if (actualHeadersArray.length > 5) {
    return new Error(`extraneous headers, limit to: ${reqHeadersProps.join(', ')} `);
  }
  actualHeadersArray.forEach((headerOption) => {
    if (!reqHeaders[headerOption]) {
      reqHeaders[headerOption] = !reqHeaders[headerOption];
    }
  });
  reqHeadersProps.forEach((header) => {
    if (!reqHeaders[header]) {
      missing.push(header);
    }
  });
  if (missing.length) {
    return new Error(`missing required header(s): ${missing.join(', ')}`);
  }
  return undefined;
}

export default function parseCSVThenValidateHeaders(uploadedCsv) {
  return new Promise((resolve, reject) => {
    const csvString = uploadedCsv.data.toString();
    const csvObjects = parse(csvString, { columns: true, auto_parse: true });
    const [headerCheck] = csvObjects;
    const headers = Object.keys(headerCheck);
    const error = validateRequiredHeaders(headers); // "error"
    if (!error) {
      resolve(csvObjects);
    } else {
      reject(error);
    }
  });
}

// TODO: testing for this helper function (success and failure)
