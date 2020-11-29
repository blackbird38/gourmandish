const User = require("../models/user");

const isUsernameAvailable = async (username) => {
  const foundUsername = await User.findOne({ username });
  return foundUsername === null ? true : false;
};

module.exports = {
  isUsernameAvailable,
};
