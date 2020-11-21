const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get(`/ping`, (req, res) =>
  res.status(200).send("Gourmandish backend working!")
);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;