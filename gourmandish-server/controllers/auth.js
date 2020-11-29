const bcrypt = require("bcrypt");
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

const signup = async (req, res, next) => {
  console.log("[POST] api/auth/signup", {
    username: req.body.credentials.username,
  });
  const { credentials } = req.body;

  bcrypt.hash(credentials.password, 10).then(async (encryptedPassword) => {
    credentials.password = encryptedPassword;
    console.log(credentials);
    return await authDAL
      .signup(credentials)
      .then((savedUser) => {
        if (savedUser) {
          res.status(200).send({ username: savedUser.username });
        }
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(422).send({
            user:
              "Account not created. Either the username or the email already exist.",
          });
        }
      });
  });
};

module.exports = { isUsernameAvailable, signup };
