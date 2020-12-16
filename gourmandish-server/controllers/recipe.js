const recipeService = require("../services/recipe");

const getAll = async (req, res, next) => {
  console.log("[GET] api/recipes");
  try {
    const result = await recipeService.getAll();
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const create = async (req, res, next) => {
  console.log("[POST] api/recipes");
  const url = req.protocol + "://" + req.get("host");
  console.log("req.file", req.file); //  req.file - multer/ file
  try {
    //const { recipe } = req.body;
    console.log(req.body);

    res.status(200).send({ coucou: "coucou" });
    return;
    const result = await recipeService.create(recipe);
    res.status(200).send(result);
  } catch (e) {
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
