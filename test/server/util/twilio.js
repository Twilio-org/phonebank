import { expect } from 'chai';
import { callStatusUpdates } from './twilio_mocks';
import { sayCallCompleted, sayHelloUser, hangUpVolunteerCall, hangUpContactCall } from '../../../server/util/twilio';

const { twilioClientVolunteer, twilioClientContact } = callStatusUpdates();

describe('Twilio client methods', function () {
  it('should be able to hang up calls between twilio client and volunteer: ', (done) => {
    expect(hangUpVolunteerCall('CAcbbf06f666c72c51c59200de56ae54ff')).to.deep.equal(twilioClientVolunteer());
    done(hangUpContactCall('CAcbbf06f666c72c51c59200de56ae54ff')).to.deep.equal(twilioClientContact() );
  });
  it('should be able to hang up calls between twilio client and contact during campaigning calls: ', () => {

  });
});
describe('XML Generation', function () {
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
});
