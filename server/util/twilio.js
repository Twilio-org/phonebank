import Twilio from 'twilio';

// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
console.log(TWILIO_ACCOUNT_SID);

const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const CALLER_ID = process.env.TWILIO_CALLER_ID;
const DEV_PATH = process.env.DEV_PATH;

export default {
  callVolunteer: (user_id, campaign_id, phone_number) => {
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
};
