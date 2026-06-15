const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
    category: {
  type: String,
  default: "Personal",
},

    completed: {
      type: Boolean,
      default: false,
    },

    completedDate: {
  type: Date,
  default: null,
},


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Habit",
  habitSchema
);