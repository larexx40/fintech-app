require('dotenv').config();

const credentials = {
    apiKey: `${process.env.AFRICASTALKING_API_KEY}`,
    username: `${process.env.AFRICASTALKING_USERNAME}`,
}

const africastalking = require('africastalking')(credentials);

//initialize a service e.g sms, ussd, token, payment
const sms = africastalking.SMS;


exports.sendSMS =async (req, res)=>{
     
    // Send message and capture the response or error
    //why cant i use async to return response
   
    try {
        
        const {to, message} = req.body || res.status(400).json({error: "both to and message are required"})
        const from = "zinoBank"
        response = await sms.send({to, from, message, enque: true});
        console.log(response);
        return res.status(200).json(response);
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);   
    }
}

