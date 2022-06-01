const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    emailToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    Spare1: {
      type: String,
    },
    Spare2: {
      type: String,
    },
    Spare3: {
      type: Number,
    },
    Spare4: {
      type: Number,
    },
  },
  {
    collection: "users",
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
