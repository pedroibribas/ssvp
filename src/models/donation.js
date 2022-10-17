const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  title: String,
  donator: String
});

module.exports = mongoose.model("Donation", donationSchema);
