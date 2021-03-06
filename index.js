const express   = require('express');
const {dbURI}   = require('./config/keys');
const app       = express();
const PORT      = process.env.PORT || 3000;

//Third party dependencies
require('express-async-errors');
const mongoose  = require('mongoose');
const passport  = require('passport');
const bodyParser= require('body-parser');
const cors      = require('cors');
const Joi       = require('joi');
Joi.objectId    = require('joi-objectid')(Joi);

//Serve image uploads
app.use(express.static('./uploads/'));

//Cors middleware
app.use(cors());
app.options('*', cors());

//Connection to the database
mongoose
    .set('useCreateIndex', true)
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => {console.log('Connected to the database...') })
    .catch(err => console.log('Error: Could not connect to the database'))

//body parser for the params
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
require('./config/passport').isAdmin(passport);
require('./config/passport').isLogin(passport);

//Import routes
app.use('/api', require('./routes'));

//Error handling middleware
app.use(function(err, req, res, next){
  res.status(500).send('Something failed...')
})

//Starts the server
app.listen(PORT, ()=>{
  console.log(`App started at PORT ${PORT}`)
});