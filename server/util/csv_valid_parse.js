import parse from 'csv-parse/lib/sync';

// promisified helper function, example usage:
// parseCSVThenValidateHeaders()
//  .then(objsArray => console.log(objsArray))
//  .catch(err => console.log(err));

export function extraHeadersError(headers) {
  return new Error(`extraneous headers, limit to: ${headers.join(', ')} `);
}
export function missingHeadersError(headers) {
  return new Error(`missing required header(s): ${headers.join(', ')}`);
}

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
    return extraHeadersError(reqHeadersProps);
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
    return missingHeadersError(missing);
  }
  return undefined;
}

export function validateParseCSV(uploadedCsv) {
  return new Promise((resolve, reject) => {
    const csvString = uploadedCsv.data.toString();
    const csvObjects = parse(csvString, { columns: true, auto_parse: true });
    const [headerCheck] = csvObjects;
    const headers = Object.keys(headerCheck);
    const error = validateRequiredHeaders(headers);
    if (!error) {
      resolve(csvObjects);
    } else {
      reject(error);
    }
  });
}
