const mongoose = require("mongoose");

const { Schema } = mongoose;

const donatorSchema = new Schema({
  name: String,
  phone: String
});

const donationSchema = new Schema({
  donation: String,
  amount: {
    type: Number,
    default: 1
  },
  donator: donatorSchema
});

module.exports = mongoose.model("Donation", donationSchema);
