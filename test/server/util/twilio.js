import { expect, Should } from 'chai';
import { sayHelloUser } from '../../../server/util/twilio';

describe('XML Generation', () => {
  const userFirstName = 'User';
  const campaignName = 'Pacific Northwest LGBTQ+ Survey'

  it('should return TwiML that uses the user\'s first name and the campaign\'s name in the proper template', () => {
    expect(sayHelloUser(userFirstName, campaignName)).to.equal(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.</Say><Play loop="0">https://api.twilio.com/cowbell.mp3</Play></Response>`
    );
  });
});
