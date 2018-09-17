const { User, validateUser} = require("../models/User");
var bcrypt = require('bcryptjs');

// @@ POST api/register/
// @@ desc Register a User
// @@ access Public
exports.registerUser = async(req, res) =>{
  try{
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already exists!');
    
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(newuser.password, salt);
    await newuser.save();
  
    res.status(200).json({
      name: newuser.name,
      email: newuser.email
    });
  }
  catch(err){
    res.status(500).json('Error')
  }
};

// @@ POST api/login
// @@ desc Login User
// @@ access Public
exports.loginUser = (req, res) =>{
  const {error} = validateUser;
  if (error) return res.status(400).send(error.details[0].message);  



}
