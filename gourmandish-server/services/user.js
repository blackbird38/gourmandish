const userDAL = require("../DAL/user");

const getById = async (userId) => {
  const foundUser = await userDAL.getById(userId);
  return foundUser;
};

module.exports = {
  getById,
};
