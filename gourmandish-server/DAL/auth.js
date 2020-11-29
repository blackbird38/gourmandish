const User = require("../models/user");

const isUsernameAvailable = async (username) => {
  const foundUsername = await User.findOne({ username });
  return foundUsername === null ? true : false;
};

const signup = async (credentials) => {
  const newUser = new User(credentials);
  const createdUser = await newUser.save();
  //console.log(createdUser);
  return createdUser;
};

const signin = async (username) => {
  const foundUser = User.findOne({ username });
  return foundUser;
};

module.exports = {
  isUsernameAvailable,
  signup,
  signin,
};
