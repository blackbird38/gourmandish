const User = require("../models/user");

const isUsernameAvailable = async (username) => {
  const foundUsername = await User.findOne({ username });
  return foundUsername === null ? true : false;
};

const saveUser = async (credentials) => {
  const newUser = new User(credentials);
  const createdUser = await newUser.save();
  return createdUser._doc;
};

const findByUsernameOrEmail = async (usernameOrEmail) => {
  var foundUser = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  return foundUser;
};

const find = async (username, email) => {
  const foundUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  return foundUser;
};

module.exports = {
  isUsernameAvailable,
  saveUser,
  findByUsernameOrEmail,
  find,
};
