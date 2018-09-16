const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

function validateCategory(category){
  const schema = {
    name: Joi.string().required().min(2).max(25)
  }
  return Joi.validate(category, schema);
}

exports.validateCategory = validateCategory;
exports.CategorySchema = CategorySchema;
exports.Category = mongoose.model('category', CategorySchema);