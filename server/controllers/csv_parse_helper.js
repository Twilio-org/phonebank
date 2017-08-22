import parse from 'csv-parse/lib/sync';

function validateRequiredHeaders(actualHeadersArray) {
  const errors = {
    mult: [],
    missing: []
  };
  const { mult, missing } = errors;
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
    if (reqHeaders[header] > 1) {
      const count = reqHeaders[header];
      const problem = {
        header,
        count
      };
      mult.push(problem);
    }
  });
  if (!mult.length && !missing.length) {
    return true;
  }
  return errors;
}

function customError(name, message) {
  const error = { error: name, message };
  throw error;
}

function handleAllErrors(errorList) {
  let errors;
  if (errorList.length === 1) {
    const [only] = errorList;
    const { name, message } = only;
    return customError(name, message);
  }
  errorList.forEach((error) => {
    const { name, message } = error;
    errors.push(customError(name, message));
  });
  return errors;
}

function handleValidationError(errorsObj) {
  const props = Object.keys(errorsObj);
  const messages = [];
  props.forEach((prop) => {
    if (errorsObj[prop].length) {
      if (prop === 'mult') {
        errorsObj.prop.forEach((errorInstance) => {
          const { count, header } = errorInstance;
          messages.push({ name: 'replicated header name(s)', message: `replications: there are ${count} ${header} headers.` });
        });
      }
      if (prop === 'missing') {
        messages.push({ name: 'missing required headers', message: `missing: ${errorsObj.missing.join(', ')}` });
      }
    }
  });
  return handleAllErrors(messages);
}

export default function parseCSVThenValidateHeaders(uploadedCsv) {
  const csvString = uploadedCsv.data.toString();
  const csvObjects = parse(csvString, { columns: true, auto_parse: true });
  const [headerCheck] = csvObjects;
  const headers = Object.keys(headerCheck);
  const result = validateRequiredHeaders(headers);
  return result ? csvObjects : handleValidationError(result);
}

// NOTE: may want to change to an async call (cb for db service calls)... or not
// in controller: import the helper and invoke on 'uploadedCsv'
// if results in error (e.g. not an array of objs), then return error

