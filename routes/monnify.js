const express =require('express');
const monnifyServices = require('../controller/monnify')
const monnify = express.Router();


monnify.get('/auth', monnifyServices.authenticate, (req, res)=>{
    res.status(200).send('success');
})


module.exports = monnify;