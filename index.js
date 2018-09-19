const express   = require('express');
const {dbURI}   = require('./config/keys');
const app       = express();
const PORT      = process.env.PORT || 3000;

//Third party dependencies
const mongoose  = require('mongoose');
const passport  = require('passport');
const Joi       = require('joi');
Joi.objectId    = require('joi-objectid')(Joi);

//Connection to the database
mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => {console.log('Connected to the database...') })
    .catch(err => console.log(err))

//express middleare for getting req.body
app.use(express.json());

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Import routes
app.use('/api', require('./routes'));

//Starts the server
app.listen(PORT, ()=>{
  console.log(`App started at PORT ${PORT}`)
});