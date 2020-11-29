const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    //console.log(credentials);
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

const signin = async (req, res, next) => {
  console.log("[POST] api/auth/signin", {
    username: req.body.credentials.username,
  });

  const { credentials } = req.body;

  console.log("credentials", credentials);
  let foundUser;
  return await authDAL
    .signin(credentials.username)
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentification failed! User not found.",
        });
      }
      //proceding to check if user provided a valid password
      foundUser = user;
      console.log("user", user);
      return bcrypt.compare(credentials.password, user.password); //returns a new promise
    })
    .then((result) => {
      console.log(result);
      // chaining another call; result = the result of the bcrypt comparison; true/false
      const token = jwt.sign(
        { email: foundUser.email, userId: foundUser._id },
        "secret_that_must_be_a_long_string",
        { expiresIn: "1h" }
      ); //creating a new token
      console.log("token", token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: foundUser._id,
      });
    })
    .catch((error) => {
      // other errors
      console.log(error);
      return res.status(401).json({
        message: "Authentification failed!",
      });
    });
};
module.exports = { isUsernameAvailable, signup, signin };
