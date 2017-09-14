import Twilio from 'twilio';
// TwilioClient initialized in app.js
let twilioClient;
// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const CALLER_ID = process.env.TWILIO_CALLER_ID;
const DEV_PATH = process.env.DEV_PATH;
const VoiceResponse = Twilio.twiml.VoiceResponse;

export function initializeTwilioClient(client) {
  twilioClient = client;
}

export function hangUpVolunteerCall(callSid, user_id) {
  return twilioClient.calls(callSid)
    .update({
      status: 'completed',
      statusCallback: `${DEV_PATH}/users/${user_id}/callback`
    });
}

export function callVolunteer(user_id, campaign_id, phone_number) {
  return twilioClient.calls.create({
    url: `${DEV_PATH}/users/${user_id}/campaigns/${campaign_id}/calls/start`,
    to: phone_number,
    from: CALLER_ID,
    statusCallback: `${DEV_PATH}/users/${user_id}/callback`,
    statusCallbackMethod: 'POST',
    method: 'POST'
  });
}

export function sayHelloUser(userFirstName, campaignName) {
  const helloUser = new VoiceResponse();
  helloUser.say(`Welcome, ${userFirstName}. You will be calling on behalf of ${campaignName}. Please follow the instructions on your computer screen to start calling.`);
  helloUser.play({ loop: 0 }, 'http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3');
  return helloUser.toString();
}

export function sayCallCompleted() {
  const CallCompleted = new VoiceResponse();
  CallCompleted.say('Call completed. Please submit the form to continue.');
  CallCompleted.play({ loop: 0 }, 'http://com.twilio.music.classical.s3.amazonaws.com/ith_chopin-15-2.mp3');
  return CallCompleted.toString();
}

export function hangUpContactCall(callSid, user_id) {
  console.log('INSIDE HANG UP CONTACT CALL:', callSid, user_id);
  return twilioClient.calls(callSid)
    .update({
      status: 'completed',
      statusCallback: `${DEV_PATH}/users/${user_id}/bridge`
    });
}

export function sayDialingContact(contactName, contactNumber, idParams) {
  const { userId, campaignId, callId } = idParams;
  const helloContact = new VoiceResponse();
  helloContact.say(`Now dialing ${contactName}`);
  helloContact.dial({ action: `${DEV_PATH}/user/${userId}/campaign/${campaignId}/calls/${callId}/callback`, method: 'POST' }, contactNumber);
  helloContact.redirect({ method: 'POST' }, `${DEV_PATH}/user/${userId}/campaign/${campaignId}/calls/bridge`);
  return helloContact.toString();
}

export function mutateCallConnectContact(callSid, idCollection) {
  const { user: user_id, campaign: campaign_id, call: call_id } = idCollection;
  return twilioClient.calls(callSid)
    .update({
      url: `${DEV_PATH}/users/${user_id}/campaigns/${campaign_id}/calls/${call_id}/connect`
    });
}
