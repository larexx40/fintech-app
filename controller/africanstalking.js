require('dotenv').config();
const Client = require('africastalking');

const africastalking = new Client({
    apiKey: 'a86710488848d715b3fed5485a63c98fb657cdb61a2103bc5d3beef81f9edd1d',
    username: 'sandbox',
})

//initialize a service e.g sms, ussd, token, payment
const sms = africastalking.SMS;

const options={
    to: '+2348100529552',
    message: "thanks africastalking",
    from: 'zinobank'
}

exports.sendSMS = (req, res)=>{
    // Send message and capture the response or error
    sms.send(options)
    .then( response => {
        console.log(response);
        res.status(200).json(response);
    })
    .catch( error => {
        console.log(error);
        res.status(400).json(error);
    });

}
