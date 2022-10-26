const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// # MongoDb

mongoose.connect(process.env.MONGODB_URI).catch(error => console.log(error));

mongoose.connection.on("error", error => console.log(error));

// # Routing

app.use("/api/users", require("./src/routes/user"));

app.use("/api/lists", require("./src/routes/list"));

// # Init

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));