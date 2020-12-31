const User = require("../models/user");
const userDAL = require("../DAL/user");
const userService = require("../services/user");

const getAll = async (req, res) => {
  console.log("[GET] api/users/");

  /*  try {
          let result = await userDAL.getAll();
          res.status(200).send(result);
      } catch (e) {
          res.status(500).send({ message: e.message });
      }*/

  await userDAL
    .getAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      res.status(500).json({
        message: `'Fetching users failed! Server error.' ${error.message}`,
      });
    });
};

const getById = async (req, res, next) => {
  console.log("[GET] api/user/:userId", { userId: req.params.userId });
  try {
    const { userId } = req.params;
    const result = await userService.getById(userId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const create = async (req, res, next) => {
  console.log("[POST] api/users/:id");

  const userProps = req.body;

  await userDAL
    .create(userProps)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      res.status(500).send({
        message: `'Creating the user failed! Server error.' ${error.message}`,
      });
    });
};

const update = async (req, res, next) => {
  console.log("[PUT] api/users/:id");

  const userId = req.params.id;
  const userProps = req.body;

  await userDAL
    .update(userProps, userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      res.status(500).json({
        message: `Couldn't update the user! Server error.' ${error.message}`,
      });
    });
};

const remove = async (req, res, next) => {
  console.log("[DELETE] api/users/:id");

  const userId = req.params.id;

  await userDAL
    .remove(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: `'Deleting user failed! Server error.' ${error.message}`,
      });
    });
};

const getAllNearby = async (req, res, next) => {
  console.log("[GET] api/users/nearby");

  const { lng = 0, lat = 0 } = req.query;
  return await userDAL
    .usergetAllNearby(parseFloat(lng), parseFloat(lat))
    .then((users) => res.status(200).send(users));
};

module.exports = { getAll, getById, create, update, remove, getAllNearby };
