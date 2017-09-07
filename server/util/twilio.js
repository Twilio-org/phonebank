import twilio from 'twilio';

// Account SID and Auth Token are stored as environmental variables
// Twilio Node module will check for them automatically upon initialization
const twilioClient = new twilio();
const CALLER_ID = process.env.TWILIO_CALLER_ID;

// import config from '../../config';
// var client = require('twilio')();
// var config = require('../../config');
// const twilioClient = new twilio(config.accountSid, config.authToken);
