const dotenv = require("dotenv");
const cors = require('cors');
const connectMongoDb = require("./src/config/mongoDbConnect");
const express = require("express");

dotenv.config();

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_QA
    : process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDb(mongoUri);

app.use("/api/users", require("./src/routes/user"));
app.use("/api/lists", require("./src/routes/list"));

app.listen(PORT, () => console.log({
    message: "Servidor inicializado com sucesso",
    port: PORT
}));