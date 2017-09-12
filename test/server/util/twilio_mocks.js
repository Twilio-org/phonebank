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
  // Allie's create call callback Object goes here
}

export const testTwilioClient = {
  calls(callSid) {
    return {
      update: () => callStatusUpdate()
    };
  }
};
