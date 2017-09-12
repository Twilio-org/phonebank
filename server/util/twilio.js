// TwilioClient and TwilioLibrary initialized in app.js
let twilioClient;
let Twilio;


export function initializeTwilioClient(client) {
  twilioClient = client;
}

export function initializeTwilioLibrary(module) {
  Twilio = module;
}

export function hangUp(callSid) {
  return twilioClient.calls(callSid)
    .update({
      status: 'completed'
      // statusCallback: //insert Lupita's callback route.
    });
}
//
//
//
// UNCOMMENT THE BELOW TWO LINES WHEN MERGING THE PLACE CALLS PR
// |
// |
// |
// V
// const twilioClient = new Twilio();
// const CALLER_ID = process.env.TWILIO_CALLER_ID;

export function sayHelloUser(userFirstName, campaignName) {
  const VoiceResponse = Twilio.twiml.VoiceResponse;
  const helloUser = new VoiceResponse();
  helloUser.say(`Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.`);
  helloUser.play({ loop: 0 }, 'http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3');
  return helloUser.toString();
}

export function sayCallCompleted() {
  const VoiceResponse = Twilio.twiml.VoiceResponse;
  const CallCompleted = new VoiceResponse();
  CallCompleted.say('Call completed. Please submit the form to continue.');
  CallCompleted.play({ loop: 0 }, 'http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3');
  return CallCompleted.toString();
}
