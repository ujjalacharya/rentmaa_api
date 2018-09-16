const express   = require('express');
const mongoose  = require('mongoose');
const key       = require('./config/key');
const app       = express();
const PORT      = process.env.PORT || 3000;

//Third party
const Joi    = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//express middleare for getting req.body
app.use(express.json());

//Connection to the database
mongoose.connect(key.dbURI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the database...')
    })
    .catch(err => console.log(err))

//Import routes
app.use('/api', require('./routes'));

//Starts the server
app.listen(PORT, ()=>{
  console.log(`App started at PORT ${PORT}`)
})