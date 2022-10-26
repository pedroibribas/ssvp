const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  title: String,
  donator: String
});

const listSchema = new Schema(
  {
    manager: String,
    items: [donationSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamp: true
  }
);

module.exports = mongoose.model("List", listSchema);