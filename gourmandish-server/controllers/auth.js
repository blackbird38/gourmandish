const User = require("../models/user");
const authDAL = require("../DAL/auth");

const isUsernameAvailable = async (req, res, next) => {
  console.log("[POST] api/auth/username", { username: req.body.username });
  const { username } = req.body;
  return await authDAL
    .isUsernameAvailable(username)
    .then((isUsernameAvailable) => {
      if (isUsernameAvailable) {
        res.status(200).send({ available: isUsernameAvailable });
      } else {
        res.status(422).send({ username: "The username is not available." });
      }
    });
};

module.exports = { isUsernameAvailable };
