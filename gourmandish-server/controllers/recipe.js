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
  try {
    const { recipe } = req.body;
    const result = await recipeService.create(recipe);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

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
};

module.exports = { getAll, create, update, remove };
