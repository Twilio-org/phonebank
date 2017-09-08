import { expect } from 'chai';
import { sayCallCompleted } from '../../../server/util/twilio';

describe('XML Generation', () => {
  it('should return TwiML that matches the template.', () => {
    expect(sayCallCompleted()).to.equal(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Call completed. Please submit the form to continue.</Say><Play loop="0">http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3</Play></Response>'
    );
  });
});
