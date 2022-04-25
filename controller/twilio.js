require ('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
//Step1 twillo(setup)
const client = require('twilio')(accountSid, authToken);

const twilio= (phoneNo, otp)=>{
    const to = phoneNo
    const code = otp
}

//above step return sid

//step 2 create verification(send token)
exports.sendSmsOtp = async (req, res)=>{
    try {
        const {to} = req.body
       const sendOtp = await client.verify.services(`${process.env.TWILIO_SERVICEID}`)//VAead84de8656d7d20fd3bbda037d53da1
       .verifications
       .create({to , channel: 'sms'})
       const status = sendOtp.status;
       console.log(status);
       return res.status(200).json(status)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

//step3 verify received token
exports.verifyOtp =async (req, res)=>{
    try {
        const {to, code} = req.body 
        const verifyOtp = await client.verify.services('VAead84de8656d7d20fd3bbda037d53da1')
        .verificationChecks
        .create({to, code})
        const status = verifyOtp.status;
        console.log(status);
        return res.status(200).json(status);        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

async function otp(phoneNo, token){
    sentOtp= ()=>{
        const {to} = phoneNo
        const sendOtp = await client.verify.services(`${process.env.TWILIO_SERVICEID}`)
        .verifications
        .create({to , channel: 'sms'})
        const status = sendOtp.status;
        return status
    }

    verifyOtp = ()=>{
        const {to} = phoneNo
        const {code}= token
        const verifyOtp = await client.verify.services('VAead84de8656d7d20fd3bbda037d53da1')
        .verificationChecks
        .create({to, code})
        const status = verifyOtp.status;
        console.log(status);       
    }
}