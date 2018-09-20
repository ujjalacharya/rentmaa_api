const mongoose = require("mongoose");
const Joi = require('joi');
const {CategorySchema} = require('./Category');

const Schema = mongoose.Schema;
const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [],
  numberOfViews: Number,
  category: {
    type: CategorySchema,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  securityDeposite: Number,
  amenities: String,
  status: {
    type: String,
    enum: ["shared", "private", "pg"]
  },
  typeOf: {
    type: String,
    enum: ["boy", "girl", "both", "family"]
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Property Validation from user input
function validateProperty(property){
  const schema = {
    title: Joi.string().required().min(2).max(25),
    address: Joi.string().required().min(2).max(25),
    price: Joi.number().required(),
    status: Joi.required().valid('shared', 'private', 'pg'),
    userId: Joi.objectId(),
    categoryId: Joi.objectId().required()
  }
  return Joi.validate(property, schema);
}

exports.validateProperty = validateProperty;

exports.Property = mongoose.model('property', PropertySchema);
