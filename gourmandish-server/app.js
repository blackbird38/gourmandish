const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const configDb = require("./config/database");
const userRoutes = require('./routes/user');

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
  const mongoUri = `mongodb://${configDb.mongo.user}:${configDb.mongo.pw}@${configDb.mongo.host}:${configDb.mongo.port}/` + `${configDb.mongo.db}`;
  mongoose.connect(mongoUri, options);
  mongoose.connection
    .once('open', () => { console.log("Connected to MongoDB"); })
    .on('error', (error) => {
      console.log("Error during the connection to MongoDB");
      console.log(error);
      process.exit(1);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);

module.exports = app;