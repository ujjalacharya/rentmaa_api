const {User} = require("../models/User");
const {secretKey, expireTime} = require('../config/keys.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validateRegisteration, validateLoginUser} = require('../validation');

// @@ POST api/register/
// @@ desc Register a User
// @@ access Public
exports.registerUser = async (req, res) => {
  const { error } = validateRegisteration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists!");

  if(req.file !== undefined){
    req.body.image = 'avatars/'+req.file.filename;
    }else{
    req.body.image = 'avatars/default.jpg';
    }

  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.image
  });

  const salt = await bcrypt.genSalt(10);
  newuser.password = await bcrypt.hash(newuser.password, salt);
  await newuser.save();

  res.status(201).json({
    name: newuser.name,
    email: newuser.email,
    avatar: newuser.avatar
  });
};

// @@ POST api/login
// @@ desc Login User
// @@ access Public
exports.loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("No user found");

  const isAuth = await bcrypt.compare(req.body.password, user.password);

  if (!isAuth) return res.status(400).json("Password did not match");

  // res.status(200).json('Authorized');
  const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin };

  jwt.sign(payload, secretKey, { expiresIn: expireTime }, (err, token) => {
    res.json({
      success: true,
      token: token
    });
  });
};

exports.switchAdminRole = async(req, res)=>{
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json("No user found");

  user.isAdmin = !user.isAdmin;
  await user.save();

  res.status(200).json(user);
}

exports.getAllUsers = async(req, res)=>{
  const users = await User.find({}).sort({date: -1});
  if (!users) return res.status(400).json("No user found");

  res.status(200).json(users)
}