const mongoose = require('mongoose');

const connectMongoDb = (mongoUri) => {
  mongoose.connect(mongoUri).catch((err) => console.log({
    message: "Erro na conexão inicial",
    error: err
  }));

  const db = mongoose.connection;

  db.on("error", (err) => console.log({
    message: "Erro após conexão inicial",
    error: err
  }));

  db.once("open", () => console.log({
    message: "Conexão bem sucedida com MongoDb",
    dbName: db.name
  }));
}

module.exports = connectMongoDb;