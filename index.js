const express = require("express");
const bodyParser = require('body-parser');
const monnifyRouter = require('./routes/monnify')

const app = express();

app.use(bodyParser.json())
app.use('/monnify', monnifyRouter );

const server = app.listen(3000, ()=>{
    console.log("Server created at port 3000");
});

