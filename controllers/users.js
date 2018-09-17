const { User, validateRegisteration, validateLoginUser} = require("../models/User");
var bcrypt = require('bcryptjs');

// @@ POST api/register/
// @@ desc Register a User
// @@ access Public
exports.registerUser = async(req, res) =>{
  try{
    const {error} = validateRegisteration(req.body);
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
exports.loginUser = async(req, res) =>{
  try{
    const {error} = validateLoginUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json('No user found')
  
    const isAuth = await bcrypt.compare(req.body.password, user.password);
  
    if (!isAuth) return res.status(400).json('Password did not match');
    
    res.status(200).json('Authorized');
    
  }
  catch(err){
    res.status(500).json('Error')
  }

}
