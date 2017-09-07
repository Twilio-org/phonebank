import Twilio from 'twilio';

// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const twilioClient = new Twilio();
const CALLER_ID = process.env.TWILIO_CALLER_ID;

export function sayHelloUser(userFirstName, campaignName) {
  const VoiceResponse = Twilio.twiml.VoiceResponse;
  const helloUser = new VoiceResponse();
  helloUser.say(`Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.`);
  helloUser.play({ loop: 0 }, 'https://api.twilio.com/cowbell.mp3');
  return helloUser.toString();
}

export const lintDummy = { twilioClient, CALLER_ID };
