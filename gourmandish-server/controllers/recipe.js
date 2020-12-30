const recipeService = require("../services/recipe");
const fs = require("fs");

const getAll = async (req, res, next) => {
  console.log("[GET] api/recipes");
  try {
    const result = await recipeService.getAll();
    res.status(200).send(result);
  } catch (e) {
    res.status(e).send({ message: e.message });
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  console.log("[GET] api/recipes/:recipeId", { recipeId: req.params.recipeId });
  try {
    const { recipeId } = req.params;
    const result = await recipeService.getById(recipeId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getByUserId = async (req, res, next) => {
  console.log("[GET] api/recipes/user/:userId", { userId: req.params.userId });
  try {
    const { userId } = req.params;
    const result = await recipeService.getByUserId(userId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const create = async (req, res, next) => {
  console.log("[POST] api/recipes");
  // console.log("req.file", req.file);
  try {
    const url = req.protocol + "://" + req.get("host");
    const uploadedFileWithMulter = req.file;
    const imagePath = `${url}/uploads/images/${uploadedFileWithMulter.filename}`;
    const { title, description } = req.body;
    const creatorId = req.jwtLoggedInUser.userId;
    const result = await recipeService.create(
      title,
      description,
      imagePath,
      creatorId
    );
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const update = async (req, res, next) => {
  console.log("[PUT] api/recipes/:recipeId", { recipeId: req.params.recipeId });
  try {
    let imagePath = req.body.image;
    const { recipeId } = req.params;
    const { title, description } = req.body;
    const updaterId = req.jwtLoggedInUser.userId;
    let isNewFileUploaded = false;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      const uploadedFileWithMulter = req.file;
      imagePath = `${url}/uploads/images/${uploadedFileWithMulter.filename}`;
      isNewFileUploaded = true;
    }

    const result = await recipeService.update(
      recipeId,
      title,
      description,
      imagePath,
      updaterId,
      isNewFileUploaded
    );

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const remove = async (req, res, next) => {
  console.log("[DELETE] api/recipes/:id", { recipeId: req.params.recipeId });
  try {
    const { recipeId } = req.params;
    const requesterId = req.jwtLoggedInUser.userId;
    const result = await recipeService.remove(recipeId, requesterId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const toggleLike = async (req, res, next) => {
  console.log("[PUT] api/recipes/like/:id", { recipeId: req.params.recipeId });
  try {
    const { recipeId } = req.params;
    const { like } = req.body;
    const requesterId = req.jwtLoggedInUser.userId;
    const result = await recipeService.toggleLike(recipeId, like, requesterId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getLikedByUserId = async (req, res, next) => {
  console.log("[GET] api/recipes/likes/:userId", { userId: req.params.userId });
  try {
    const { userId } = req.params;
    const result = await recipeService.getLikedByUserId(userId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const parseError = (e) => {
  const error = JSON.parse(e.message);
  const code = error.code || 500;
  const message = error.message || e.message;
  return {
    code: code,
    message: message,
  };
};

module.exports = {
  getAll,
  getByUserId,
  getById,
  create,
  update,
  remove,
  toggleLike,
  getLikedByUserId,
};
