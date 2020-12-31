const User = require("../models/user");

const getAll = () => {
  return User.find();
};

const create = (userProps) => {
  const newUser = new User(userProps);
  return newUser.save();
};

const getById = async (userId) => {
  const foundUser = await User.findOne(
    { _id: userId },
    { __v: 0, password: 0, updatedAt: 0, roles: 0, email: 0 }
  );
  console.log(foundUser);
  return foundUser;
};

const update = (userProps, userId) => {
  return User.findByIdAndUpdate({ _id: userId }, userProps).then((user) => {
    return User.findById({ _id: user._id });
  });
};

const remove = (userId) => {
  return User.findByIdAndDelete({ _id: userId });
};

const getAllNearby = (lng, lat) => {
  return User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, lat],
        },
        spherical: true,
        maxDistance: 200000,
        distanceField: "dist.calculated",
      },
    },
  ]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllNearby,
};
