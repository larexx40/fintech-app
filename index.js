const express = require("express");
const bodyParser = require('body-parser');
const monnifyRouter = require('./routes/monnify');
const userRouter = require('./routes/users');
const africastalkingRouter = require('./routes/africastalking');
const twilioRouter = require('./routes/twilio');

const app = express();

app.use(bodyParser.json())
app.use('/monnify', monnifyRouter );
app.use('/user', userRouter);
app.use('/africastalking', africastalkingRouter);
app.use('/twilio', twilioRouter);

const server = app.listen(3000, ()=>{
    console.log("Server created at port 3000");
});

