const express =require('express');
const monnifyServices = require('../controller/monnify')
const monnify = express.Router();
require('dotenv').config()


monnify.post('/verifyBVN', monnifyServices.verifyBVN)

monnify.get('/verifyAcc', monnifyServices.verifyBankAccount, (req, res)=>{})

monnify.post('/reserveAcc', monnifyServices.reserveAcc)

module.exports = monnify;