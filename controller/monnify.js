require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.MONNIFY_API_KEY
const secretKey = process.env.MONNIFY_SECRET_KEY
const baseUrl = process.env.MONNIFY_BASE_URL

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



module.exports = {
    authenticate: authenticate,
}