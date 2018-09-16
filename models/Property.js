const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
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
    enum: ["Shared", "Private", "PG"]
  },
  typeOf: {
    type: String,
    enum: ["Boy", "Girl", "Both", "Family"]
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

exports.Property = mongoose.model('property', PropertySchema);
