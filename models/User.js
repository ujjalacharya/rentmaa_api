const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function validateRegisteration(user){
  const schema = {
    name : Joi.string().required().min(2),
    email : Joi.string().required().email().min(2),
    password : Joi.string().required().min(4)
  }
  return Joi.validate(user, schema); 
}

function validateLoginUser(user){
  const schema = {
    email : Joi.string().required().email().min(2),
    password : Joi.string().required().min(4)
  }
  return Joi.validate(user, schema); 
}

exports.validateLoginUser = validateLoginUser;
exports.validateRegisteration = validateRegisteration;
exports.User = mongoose.model('user', UserSchema);