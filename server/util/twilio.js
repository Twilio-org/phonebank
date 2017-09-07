import Twilio from 'twilio';
import dotenv from 'dotenv';
// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
dotenv.load();

const twilioClient = new Twilio();
const CALLER_ID = process.env.TWILIO_CALLER_ID;
const DEV_PATH = process.env.DEV_PATH;

export function callUser(user_id, campaign_id, phone_number) {
  twilioClient.calls.create({
    url: `${DEV_PATH}/users/${user_id}/campaign/${campaign_id}/calls/start`,
    to: phone_number,
    from: CALLER_ID,
    statusCallback: `${DEV_PATH}/users/${user_id}/callback`,
    statusCallbackMethod: 'POST',
    statusCallbackEvent: ['completed', 'busy', 'no-answer', 'canceled', 'failed'],
    method: 'POST'
  })
  .then(call => call.sid)
  .catch(err => console.log(err));
}

export function sayHelloUser(userFirstName, campaignName) {
  const VoiceResponse = Twilio.twiml.VoiceResponse;
  const helloUser = new VoiceResponse();
  helloUser.say(`Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.`);
  helloUser.play({ loop: 0 }, 'https://api.twilio.com/cowbell.mp3');
  return helloUser.toString();
}
