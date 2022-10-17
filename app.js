const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const { getDonations, addDonator, deleteDonation, setDonations, deleteDonator } = require("./src/controllers/donation");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// # MongoDb connection

mongoose.connect(process.env.MONGODB_URI).catch(error => console.log(error));

mongoose.connection.on("error", error => console.log(error));

// # Routing

app
  .route('/api/donations')
  .get(getDonations)
  .post(setDonations)
  .delete(deleteDonation);

app
  .route("/api/donations/donator")
  .post(addDonator)
  .delete(deleteDonator);

// # Init server

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));