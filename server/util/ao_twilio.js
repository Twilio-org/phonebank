import Twilio from 'twilio';

// NOTE: WILL BE CONSOLIDATED WITH TWILIO.JS AFTER PRECEEDING WORK IS IN
// (trying to avoid merge conflcits)
const VoiceResponse = Twilio.twiml.VoiceResponse;
const DEV_PATH = process.env.DEV_PATH;

export default function sayDialingContact(contactName, contactNumber, userId, campaignId) {
  const helloContact = new VoiceResponse();
  helloContact.say(`Now dialing ${contactName}`);
  const dial = helloContact.dial();
  dial.number(contactNumber);
  helloContact.dial({ action: `${DEV_PATH}/user/${userId}/campaign/${campaignId}/calls/:id/callback`}, contactNumber);
  helloContact.redirect(`${DEV_PATH}/user/${userId}/campaign/${campaignId}/calls/bridge`);
  return helloContact.toString();
}
