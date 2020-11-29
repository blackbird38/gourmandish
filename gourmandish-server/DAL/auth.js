const User = require("../models/user");

const isUsernameAvailable = async (username) => {
  const foundUsername = await User.findOne({ username });
  return foundUsername === null ? true : false;
};

const signup = async (credentials) => {
  const newUser = new User(credentials);
  const createdUser = await newUser.save();
  return createdUser;
};

module.exports = {
  isUsernameAvailable,
  signup,
};
