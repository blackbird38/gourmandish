const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configDb = require("./config/database");
const userRoutes = require("./routes/user");

const app = express();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
};

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  //const mongoUri = 'mongodb://localhost/gourmandishdb';
  const mongoUri =
    `mongodb://${configDb.mongo.user}:${configDb.mongo.pw}@${configDb.mongo.host}:${configDb.mongo.port}/` +
    `${configDb.mongo.db}`;
  mongoose.connect(mongoUri, options);
  mongoose.connection
    .once("open", () => {
      console.log("Connected to MongoDB");
    })
    .on("error", (error) => {
      console.log("Error during the connection to MongoDB");
      console.log(error);
      process.exit(1);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

userRoutes(app);

module.exports = app;
