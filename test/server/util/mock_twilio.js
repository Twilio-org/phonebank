
const mockCreateCalls = () => (
  {
    accountSid: 'ACe58e2ed1a2afc1937e12df259209bf9f',
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
    from: '+16032750521',
    fromFormatted: '(603) 275-0521',
    groupSid: null,
    parentCallSid: null,
    phoneNumberSid: 'PN3aedbdca4d76c115e232c48723ab4fb8',
    price: null,
    priceUnit: 'USD',
    sid: 'CA4d4d8b500d8f2eb883342c4eef681300',
    startTime: null,
    status: 'queued',
    subresourceUris:
    { notifications: '/2010-04-01/Accounts/ACe58e2ed1a2afc1937e12df259209bf9f/Calls/CA4d4d8b500d8f2eb883342c4eef681300/Notifications.json',
      recordings: '/2010-04-01/Accounts/ACe58e2ed1a2afc1937e12df259209bf9f/Calls/CA4d4d8b500d8f2eb883342c4eef681300/Recordings.json' },
    to: '+14086428264',
    toFormatted: '(408) 642-8264',
    uri: '/2010-04-01/Accounts/ACe58e2ed1a2afc1937e12df259209bf9f/Calls/CA4d4d8b500d8f2eb883342c4eef681300.json'
  }
);

export default function twilio() {
  return {
    calls: {
      create: mockCreateCalls
    }
  };
}
