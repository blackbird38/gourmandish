const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authDAL = require("../DAL/auth");

const isUsernameAvailable = async (username) => {
  const usernameAvailability = await authDAL.isUsernameAvailable(username);
  if (!usernameAvailability) {
    throw new Error("The username is not available.");
  }
  return { isUsernameAvailable: usernameAvailability };
};

module.exports = {
  isUsernameAvailable,
};
