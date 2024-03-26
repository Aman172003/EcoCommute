const mongoose = require("mongoose");

const dbURL = "mongodb://127.0.0.1:27017/ecoCommute";

const connectToDB = () => {
  mongoose.connect(dbURL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });
};

module.exports = connectToDB;
