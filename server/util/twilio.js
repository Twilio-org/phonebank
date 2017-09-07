import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.load();

// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const twilioClient = new Twilio();

const CALLER_ID = process.env.TWILIO_CALLER_ID;
const DEV_PATH = process.env.DEV_PATH;

export default function callVolunteer(user_id, campaign_id, phone_number) {
  return new Promise((resolve, reject) => {
    twilioClient.calls.create({
      url: `${DEV_PATH}/users/${user_id}/campaign/${campaign_id}/calls/start`,
      to: phone_number,
      from: CALLER_ID,
      statusCallback: `${DEV_PATH}/users/${user_id}/callback`,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['completed', 'busy', 'no-answer', 'canceled', 'failed'],
      method: 'POST'
    })
    .then((call) => {
      if (call) {
        resolve(call);
      } else {
        reject(new Error({ message: 'Error in callVolunteer promise' }));
      }
    })
    .catch(err => console.log(err));
  });
}
