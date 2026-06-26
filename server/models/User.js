const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    xp: {
  type: Number,
  default: 0,
},

streak: {
  type: Number,
  default: 0,
},

isPremium: {
  type: Boolean,
  default: false,
},
csvExports: {
  type: Number,
  default: 0,
},

  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "User",
    userSchema
  );