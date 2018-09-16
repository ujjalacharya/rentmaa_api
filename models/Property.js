const mongoose = require("mongoose");
const Joi = require('joi');
const {CategorySchema} = require('./Category');

const Schema = mongoose.Schema;
const PropertySchema = new Schema({
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

function validateProperty(property){
  const schema = {
    title: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.required().valid('shared', 'private', 'pg'),
    userId: Joi.objectId(),
    categoryId: Joi.objectId().required()
  }
  return Joi.validate(property, schema);
}

exports.validateProperty = validateProperty;

exports.Property = mongoose.model('property', PropertySchema);
