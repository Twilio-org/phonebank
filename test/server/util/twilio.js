import { expect } from 'chai';
import { CALL_COMPLETE, CONNECT_CONTACT_URL, returnUpdate, createCall } from './twilio_mocks';
import { hangUp, mutateCallConnectContact, sayCallCompleted, sayHelloUser, sayDialingContact, callVolunteer } from '../../../server/util/twilio';


describe('Twilio client methods', function() {
  it('should be able to hang up calls', (done) => {
    expect(hangUp('CAcbbf06f666c72c51c59200de56ae54ff')).to.deep.equal(returnUpdate('CAcbbf06f666c72c51c59200de56ae54ff', CALL_COMPLETE));
    done();
  });
  it('should be able to mutate calls when connecting volunteers to contacts', (done) => {
    const idCollection = {
      call: 1,
      campaign: 1,
      user: 1
    };
    expect(mutateCallConnectContact('CAcbbf06f666c72c51c59200de56ae54ff', idCollection)).to.deep.equal(returnUpdate('CAcbbf06f666c72c51c59200de56ae54ff', CONNECT_CONTACT_URL));
    done();
  });
  it('should create a new call', (done) => {
    expect(callVolunteer(1, 1, '+15555555555')).to.deep.equal(createCall());
    done();
  });
  it('should return a call object', (done) => {
    expect(typeof callVolunteer(1, 1, '+15555555555')).to.equal('object');
    expect(callVolunteer(1, 1, '+15555555555')).to.include.keys('accountSid', 'status', 'sid', 'phoneNumberSid', 'to', 'from');
    expect(callVolunteer(1, 1, '+15555555555').to).to.equal('+15555555555');
    done();
  });
});
describe('XML Generation', function() {
  const userFirstName = 'User';
  const campaignName = 'Pacific Northwest LGBTQ+ Survey';

  it('should return TwiML that uses the user\'s first name and the campaign\'s name in the start call template', () => {
    expect(sayHelloUser(userFirstName, campaignName)).to.equal(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.</Say><Play loop="0">http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3</Play></Response>`
    );
  });
  it('should return TwiML that matches the call bridge template.', () => {
    expect(sayCallCompleted()).to.equal(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Call completed. Please submit the form to continue.</Say><Play loop="0">http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3</Play></Response>'
    );
  });
  it('should return TwiML that matches the the call connect template: ', () => {
    const contactNumber = '15555555555';
    const contactName = 'Harry Potter';
    const connectionString = process.env.DEV_PATH;
    const params = {
      callId: 1,
      campaignId: 1,
      userId: 1
    };
    const { userId, campaignId, callId } = params;
    const expectedTwimlString = `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Now dialing ${contactName}</Say><Dial action="${connectionString}/user/${userId}/campaign/${campaignId}/calls/${callId}/callback" method="POST">${contactNumber}</Dial><Redirect method="POST">${connectionString}/user/${userId}/campaign/${campaignId}/calls/bridge</Redirect></Response>`;
    expect(sayDialingContact(contactName, contactNumber, params)).to.equal(expectedTwimlString);
  });
});
