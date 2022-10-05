const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const { getDonations, setDonation, addDonator } = require("./src/controllers/donation");

const PORT = process.env.PORT || 5000;

const app = express();

// # MongoDb connection

mongoose.connect(process.env.MONGODB_URI).catch(error => console.log(error));

mongoose.connection.on("error", error => console.log(error));

// # Routing

app.route("/donations").get(getDonations).post(setDonation);

app.route("/donations/:id").post(addDonator);

// # Serve UI

// # Init server

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));