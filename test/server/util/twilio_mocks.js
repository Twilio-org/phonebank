const { TWILIO_ACCOUNT_SID } = process.env;

export const CALL_COMPLETE = 'CALL_COMPLETE';
export const CONNECT_CONTACT_URL = 'CONNECT_CONTACT_URL';

export function returnUpdate(updateType) {
  const clientUpdateObject = {
    accountSid: `${TWILIO_ACCOUNT_SID}`,
    annotation: null,
    answeredBy: null,
    apiVersion: '2010-04-01',
    callerName: '',
    dateCreated: '2017-09-11T18:20:15.000Z',
    dateUpdated: '2017-09-11T18:20:44.000Z',
    direction: 'outbound-api',
    duration: null,
    endTime: null,
    forwardedFrom: null,
    from: '+14083409940',
    fromFormatted: '(408) 340-9940',
    groupSid: null,
    parentCallSid: null,
    phoneNumberSid: 'PNea33e72ef31e2b72ef8315b16c0c63e2',
    price: null,
    priceUnit: 'USD',
    sid: 'CAcbbf06f666c72c51c59200de56ae54ff',
    startTime: '2017-09-11T18:20:30.000Z',
    status: null,
    subresourceUris: {
      notifications: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff/Notifications.json`,
      recordings: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff/Recordings.json`
    },
    to: '+14086428264',
    toFormatted: '(408) 642-8264',
    uri: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff.json`
  }
  switch (updateType) {
    case CALL_COMPLETE:
      clientUpdateObject.duration = '14';
      clientUpdateObject.endTime = '2017-09-11T18:20:44.000Z'
      clientUpdateObject.status = 'completed'
      return clientUpdateObject;
    case CONNECT_CONTACT_URL:
      clientUpdateObject.status = 'in-progress'
      return clientUpdateObject;
    default:
      return clientUpdateObject;
  }
}

export function createCall() {
  // Allie's create call callback Object goes here
}

//stole this array comparison extension from stackoverflow
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

export const testTwilioClient = {
  calls(callSid) {
    return {
      update: (options) => {
        const optionsCalled = Object.getOwnPropertyNames(options).sort();
        if (optionsCalled.equals([ 'status', 'statusCallback' ])) {
          return returnUpdate(CALL_COMPLETE);
        } else if (optionsCalled.equals([ 'url' ])) {
          return returnUpdate(CONNECT_CONTACT_URL);
        } else {
          return returnUpdate();
        }
      }
    };
  }
}
