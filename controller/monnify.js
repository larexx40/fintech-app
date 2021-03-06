require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.MONNIFY_API_KEY
const secretKey = process.env.MONNIFY_SECRET_KEY
const baseUrl = process.env.MONNIFY_BASE_URL
const contractCode = process.env.MONNIFY_CONTRACT_CODE

// generate auth2.0 bearer token
async function authenticate(){
    const clientIDSecretInBase64 = Buffer.from(apiKey + ':' + secretKey).toString('base64');
    const headers ={
        Authorization: 'Basic ' + clientIDSecretInBase64
    }
    const response = await axios.post(baseUrl + '/api/v1/auth/login', null, { headers });
    const { responseBody } = response.data;
    const { accessToken, expiresIn } = responseBody; // valid for 1hr if expired, cache another one
    console.log({status: "token generated",});

    return accessToken;
    
}

exports.verifyBankAccount= async (req, res)=>{
    try {
        const accessToken = await authenticate();
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }

        const response = await axios.get(baseUrl + '/api/v1/disbursements/account/validate?accountNumber=0068687503&bankCode=232', null, {headers});
        const responseBody = response.data
        console.log(responseBody);
        return res.status(200).send(responseBody);        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

//not working at test mode.
exports.verifyBVN =  async (req, res)=>{
    try {
        const input = {
            "bvn":"22222222226",
            "name": "OLATUNDE JOSIAH OGUNBOYEJO",
            "dateOfBirth": "27-Apr-1993",
            "mobileNo": "08142223149"
        }
    
        const accessToken = await authenticate();
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }
    
        const url = 'https://api.monnify.com/api/v1/vas/bvn-details-match'
        const response = await axios.post(url, input, {headers});
        const responseBody = response.data;
        console.log(responseBody);
        return res.status(200).send(responseBody)
        
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

exports.reserveAcc = async (req, res)=>{
    try {
        const input ={
            "accountReference": "atg209",
            "accountName": "Test Reserved Accountname7",
            "currencyCode": "NGN",
            "contractCode": contractCode,
            "customerEmail": "test@tester.com",
            "bvn": "21212121212",
            "customerName": "John Doe", 
            "getAllAvailableBanks": false,
            "preferredBanks": ["035"]
        }
        const accessToken = await authenticate();
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }
        const response = await axios.post(baseUrl + '/api/v2/bank-transfer/reserved-accounts', input, {headers});
        const responseBody = response.data;
        console.log(responseBody);
        const { accountName, customerEmail, accounts } = responseBody
        console.log(accountName);
        return res.status(200).send(responseBody)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}
