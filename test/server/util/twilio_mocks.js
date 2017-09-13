const { TWILIO_ACCOUNT_SID } = process.env;

export function callStatusUpdate() {
  return {
    accountSid: `${TWILIO_ACCOUNT_SID}`,
    annotation: null,
    answeredBy: null,
    apiVersion: '2010-04-01',
    callerName: '',
    dateCreated: '2017-09-11T18:20:15.000Z',
    dateUpdated: '2017-09-11T18:20:44.000Z',
    direction: 'outbound-api',
    duration: '14',
    endTime: '2017-09-11T18:20:44.000Z',
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
    status: 'completed',
    subresourceUris: {
      notifications: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff/Notifications.json`,
      recordings: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff/Recordings.json`
    },
    to: '+14086428264',
    toFormatted: '(408) 642-8264',
    uri: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/CAcbbf06f666c72c51c59200de56ae54ff.json`
  };
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
  calls: () => (
    { update: () => callStatusUpdate() }
  )
};

testTwilioClient.calls.create = () => createCall();

