const mongoose = require("mongoose");
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
  numberOfViews: {
    type: Number,
    default: 0
  },
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
  },
  approved: {
    type: Boolean,
    default: false
  }
});

exports.Property = mongoose.model('property', PropertySchema);
