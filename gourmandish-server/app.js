const express = require("express");
const mongoose = require("mongoose");

const app = express();

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  const mongoUri = "mongodb://127.0.0.1:27017/gourmandishdb";

  const connection = mongoose.createConnection(mongoUri, options);

  connection.once("open", () => console.log("Connected to MongoDB"));
  connection.on("error", (err) => {
    console.log("Error during the connection to MongoDB");
    console.log(err);
    process.exit(1);
  });
}

module.exports = app;