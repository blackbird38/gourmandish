const userDAL = require("../DAL/user");

const getById = async (userId) => {
  const foundUser = await userDAL.getById(userId);
  return foundUser;
};

const toggleFollow = async (userId, follow, requesterId) => {
  const isUpdated = await userDAL.toggleFollow(userId, follow, requesterId);
  if (!isUpdated) {
    return null; //TODO: check here
  }
  return await getById(userId);
};

module.exports = {
  getById,
  toggleFollow,
};
