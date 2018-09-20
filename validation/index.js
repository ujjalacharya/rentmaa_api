const Joi = require('joi');


exports.validateComment = (user) => {
  const schema = {
    text : Joi.string().required().min(2).max(255)
  }
  return Joi.validate(user, schema); 
}