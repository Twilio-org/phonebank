import parse from 'csv-parse/lib/sync';

function validateRequiredHeaders(actualHeadersArray) {
  const errors = {
    missing: []
  };
  const { missing } = errors;
  const reqHeaders = {
    external_id: 0,
    first_name: 0,
    last_name: 0,
    email: 0,
    phone_number: 0
  };
  const reqHeadersProps = Object.keys(reqHeaders);
  actualHeadersArray.forEach((headerOption) => {
    if (reqHeaders[headerOption] >= 0) {
      reqHeaders[headerOption] += 1;
    }
  });
  reqHeadersProps.forEach((header) => {
    if (!reqHeaders[header]) {
      missing.push(header);
    }
  });
  if (!missing.length) {
    return true;
  }
  return errors;
}

function customError(name, message) {
  return new Error(message);
}

function handleError(errorList) {
  const [only] = errorList;
  const { name, message } = only;
  return customError(name, message);
}

function handleValidationError(errorsObj) {
  const props = Object.keys(errorsObj);
  const messages = [];
  props.forEach((prop) => {
    if (errorsObj[prop].length) {
      if (prop === 'missing') {
        messages.push({ name: 'missing required headers', message: `missing required header(s): ${errorsObj.missing.join(', ')}` });
      }
    }
  });
  return handleError(messages);
}

export default function parseCSVThenValidateHeaders(uploadedCsv) {
  const csvString = uploadedCsv.data.toString();
  const csvObjects = parse(csvString, { columns: true, auto_parse: true });
  const [headerCheck] = csvObjects;
  const headers = Object.keys(headerCheck);
  const result = validateRequiredHeaders(headers);
  return result && typeof result !== 'object' ? csvObjects : handleValidationError(result);
}

// NOTE: may want to change to an async call (cb for db service calls)... or not
// in controller: import the helper and invoke on 'uploadedCsv'
// if results in error (e.g. not an array of objs), then return error

// try and catch in controller to catch the error (if any)

