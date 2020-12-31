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

const getFollowers = async (userId) => {
  const followers = await userDAL.getFollowers(userId);
  return followers;
};

const getFollowing = async (userId) => {
  const following = await userDAL.getFollowing(userId);
  return following;
};

module.exports = {
  getById,
  toggleFollow,
  getFollowers,
  getFollowing,
};
