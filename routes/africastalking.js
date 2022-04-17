const express = require('express');
const africastalkingService = require('../controller/africanstalking');
const africanstalking = express.Router();

africanstalking.post('/sendsms', africastalkingService.sendSMS);

module.exports = africanstalking;