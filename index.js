const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//express middleare for getting req.body
app.use(express.json());

//Import routes
app.use('/api', require('./routes'));

app.listen(PORT, ()=>{
  console.log(`App started at PORT ${PORT}`)
})