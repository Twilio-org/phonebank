import lodash from 'lodash';

const { TWILIO_ACCOUNT_SID } = process.env;

export const CALL_COMPLETE = 'CALL_COMPLETE';
export const CONNECT_CONTACT_URL = 'CONNECT_CONTACT_URL';

export function returnUpdate(callSid, updateType) {
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
    sid: callSid,
    startTime: '2017-09-11T18:20:30.000Z',
    status: null,
    subresourceUris: {
      notifications: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}/Notifications.json`,
      recordings: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}/Recordings.json`
    },
    to: '+14086428264',
    toFormatted: '(408) 642-8264',
    uri: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}.json`
  };
  switch (updateType) {
    case CALL_COMPLETE:
      clientUpdateObject.duration = '14';
      clientUpdateObject.endTime = '2017-09-11T18:20:44.000Z';
      clientUpdateObject.status = 'completed';
      return clientUpdateObject;
    case CONNECT_CONTACT_URL:
      clientUpdateObject.status = 'in-progress';
      return clientUpdateObject;
    default:
      return clientUpdateObject;
  }
}

export function createCall() {
  return {
    accountSid: `${TWILIO_ACCOUNT_SID}`,
    annotation: null,
    answeredBy: null,
    apiVersion: '2010-04-01',
    callerName: null,
    dateCreated: null,
    dateUpdated: null,
    direction: 'outbound-api',
    duration: null,
    endTime: null,
    forwardedFrom: null,
    from: '+14157614347',
    fromFormatted: '(415) 761-4347',
    groupSid: null,
    parentCallSid: null,
    phoneNumberSid: 'PNfaf641002a732825de95dc80e1e69e72',
    price: null,
    priceUnit: 'USD',
    sid: 'CAba4b59ede2ca5f2a5034f85a9880ccef',
    startTime: null,
    status: 'queued',
    subresourceUris:
    { notifications: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAba4b59ede2ca5f2a5034f85a9880ccef/Notifications.json`,
      recordings: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAba4b59ede2ca5f2a5034f85a9880ccef/Recordings.json` },
    to: '+16032750521',
    toFormatted: '(603) 275-0521',
    uri: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAba4b59ede2ca5f2a5034f85a9880ccef.json`
  };
}

export const testTwilioClient = {
  calls(callSid) {
    return {
      update: (options) => {
        const optionsCalled = Object.getOwnPropertyNames(options).sort();
        if (lodash.isEqual(optionsCalled, ['status', 'statusCallback'])) {
          return returnUpdate(callSid, CALL_COMPLETE);
        } else if (lodash.isEqual(optionsCalled, ['url'])) {
          return returnUpdate(callSid, CONNECT_CONTACT_URL);
        }
        return returnUpdate(callSid);
      }
    };
  }
};

testTwilioClient.calls.create = () => createCall();
