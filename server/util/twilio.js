import Twilio from 'twilio';

// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const twilioClient = new Twilio();
const CALLER_ID = process.env.TWILIO_CALLER_ID;

// Added the below console.logs to pass linting - please delete!
console.log(twilioClient);
console.log(CALLER_ID);
