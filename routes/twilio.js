const express = require("express");
const twilioServices = require('../controller/twilio');
const twilio = express.Router();


twilio.get('/smsotp', twilioServices.sendSmsOtp );
twilio.get('/verifyotp', twilioServices.verifyOtp);

module.exports = twilio