const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  const mongoUri = 'mongodb://localhost/gourmandishdb';

  mongoose.connect(mongoUri, options);
  mongoose.connection
    .once('open', () => { console.log("Connected to MongoDB"); })
    .on('error', (error) => {
      console.log("Error during the connection to MongoDB");
      console.log(err);
      process.exit(1);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);

module.exports = app;