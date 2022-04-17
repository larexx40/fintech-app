require ('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
//Step1 twillo(setup)
const client = require('twilio')(accountSid, authToken);

client.verify.services.create({friendlyName: 'My First Verify Service'})
.then(service => console.log({service: service.sid, status: "SENT"}));

//above step return sid

//step 2 create verification(send token)
exports.sendSmsOtp = (req, res)=>{
    try {
       const sendOtp = await client.verify.services('VAe94857d2081c4407af51fa1a75a1313d')
       .verifications
       .create({to: req.body , channel: 'sms'})
       const status = sendOtp.status;
       console.log(status);
       return res.status(200).json(status)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

//step3 verify received token
exports.verifyOtp = (req, res)=>{
    try {
        const verifyOtp = client.verify.services('VAe94857d2081c4407af51fa1a75a1313d')
        .verificationChecks
        .create({to: '+2348100529552', code: req.body})
        const status = verifyOtp.status;
        console.log(status);
        return res.status(200).json(status);        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
