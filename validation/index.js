const Joi = require('joi');

//Validate Comment
exports.validateComment = (user) => {
  const schema = {
    text : Joi.string().required().min(2).max(255)
  }
  return Joi.validate(user, schema); 
}

//User validation (Register/ Login)
exports.validateRegisteration = (user) => {
  const schema = {
    name : Joi.string().required().min(2),
    email : Joi.string().required().email().min(2),
    password : Joi.string().required().min(4)
  }
  return Joi.validate(user, schema); 
}

exports.validateLoginUser = (user) => {
  const schema = {
    email : Joi.string().required().email().min(2),
    password : Joi.string().required().min(4)
  }
  return Joi.validate(user, schema); 
}

//Property Validation from user input
exports.validateProperty = (property) => {
  const schema = {
    title: Joi.string().required().min(2).max(255),
    address: Joi.string().required().min(2).max(25),
    price: Joi.number().required(),
    status: Joi.required().valid('shared', 'private', 'pg'),
    userId: Joi.objectId(),
    categoryId: Joi.objectId().required()
  }
  return Joi.validate(property, schema);
}

//Category Validation
exports.validateCategory = (category) => {
  const schema = {
    name: Joi.string().required().min(2).max(25)
  }
  return Joi.validate(category, schema);
}