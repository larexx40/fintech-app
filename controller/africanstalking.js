require('dotenv').config();
const Client = require('africastalking');

const africastalking = new Client({
    apiKey: `${process.env.AFRICASTALKING_API_KEY}`,
    username: `${process.env.AFRICASTALKING_USERNAME}`,
})

//initialize a service e.g sms, ussd, token, payment
const sms = africastalking.SMS;

const options={
    to: '+2348100529552',
    message: "thanks africastalking",
    from: 'zinobank'
}

exports.sendSMS =async (req, res)=>{
     
    // Send message and capture the response or error
    //why cant i use async to return response
    try {
        const options={
            to: '+2347044752340',
            message: "Olanrewaju welcome to africastalking",
            from: 'zinobank'
        }

        response = await sms.send(options)
        console.log(response);
        return res.status(200).json(response);
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);   
    }
}

