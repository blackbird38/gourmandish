const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const configDb = require("./config/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");

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
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads/images", express.static(path.join("uploads/images"))); // any request targeting this folder, should be allowed to continue and fetch the files from there

// CORS issue:
app.use((req, res, next) => {
  //console.log(req);
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow req from all domains
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

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);
//userRoutes(app);
//recipeRoutes(app);

module.exports = app;
