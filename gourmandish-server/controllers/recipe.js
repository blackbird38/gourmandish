const recipeService = require("../services/recipe");

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

const create = async (req, res, next) => {
  console.log("[POST] api/recipes");
  console.log("req.file", req.file);
  try {
    const url = req.protocol + "://" + req.get("host");
    const uploadedFileWithMulter = req.file;
    const imagePath = `${url}/uploads/images/${uploadedFileWithMulter.filename}`;
    const { title, description } = req.body;
    console.log(req.body);
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

/*
const update = async (req, res, next) => {
  console.log("[PUT] api/recipes/:id");
  try {
    const { recipe } = req.body;
    const result = await recipeService.update(recipe);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  console.log("[DELETE] api/recipes/:id");
  try {
    const { id } = req.body;
    const result = await recipeService.remove(id);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};*/

const parseError = (e) => {
  const error = JSON.parse(e.message);
  const code = error.code || 500;
  const message = error.message || e.message;
  return {
    code: code,
    message: message,
  };
};

module.exports = { getAll, create /*, update, remove*/ };
