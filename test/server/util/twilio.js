import { expect } from 'chai';
import { sayCallCompleted, sayHelloUser } from '../../../server/util/twilio';

describe('XML Generation', () => {
  const userFirstName = 'User';
  const campaignName = 'Pacific Northwest LGBTQ+ Survey'

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
