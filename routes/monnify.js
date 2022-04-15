const express =require('express');
const controller = require('../controller/monnify')
const monnify = express.Router();

monnify.get('/auth', controller.auth)

module.exports = monnify