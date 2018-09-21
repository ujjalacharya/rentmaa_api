const {User} = require("../models/User");
const {secretKey, expireTime} = require('../config/keys.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validateRegisteration, validateLoginUser} = require('../validation');

// @@ POST api/register/
// @@ desc Register a User
// @@ access Public
exports.registerUser = async (req, res) => {
  try {
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

    res.status(200).json({
      name: newuser.name,
      email: newuser.email,
      avatar: newuser.avatar
    });
  } catch (err) {
    res.status(500).json("Error");
  }
};

// @@ POST api/login
// @@ desc Login User
// @@ access Public
exports.loginUser = async (req, res) => {
  try {
    const { error } = validateLoginUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("No user found");

    const isAuth = await bcrypt.compare(req.body.password, user.password);

    if (!isAuth) return res.status(400).json("Password did not match");

    // res.status(200).json('Authorized');
    const payload = { id: user.id, name: user.name };

    jwt.sign(payload, secretKey, { expiresIn: expireTime }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });

  }
  catch (err) {
    res.status(500).json("Error");
  }
};
