const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const {
  getLists,
  setList,
  getList,
  deleteList,
  addDonator,
  deleteDonator,
  deleteDonation,
  addDonation
} = require('./src/controllers/list');
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// # MongoDb connection

mongoose.connect(process.env.MONGODB_URI).catch(error => console.log(error));

mongoose.connection.on("error", error => console.log(error));

// # Routing

app.route('/api/lists').get(getLists).post(setList);

app.route("/api/lists/:id").get(getList).post(addDonation).delete(deleteList);

app.route("/api/lists/:id/donations").post(addDonator);

app
  .route("/api/lists/:listId/donations/:itemId")
  .delete(deleteDonation);

app
  .route("/api/lists/:listId/donations/:itemId/donator")
  .delete(deleteDonator);

// # Init server

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));