const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  title: String,
  donator: String
});

const listSchema = new Schema({
  manager: String,
  items: [donationSchema]
});

module.exports = mongoose.model("List", listSchema);