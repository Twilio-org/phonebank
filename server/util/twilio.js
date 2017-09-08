import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.load();
// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(ACCOUNT_SID, AUTH_TOKEN);

// Added the below console.logs to pass linting - please delete!

export function hangUp(callSid) {
  return twilioClient.calls(callSid)
    .update({
      status: 'completed'
      // statussCallback: //insert Lupita's callback route.
    });
}
