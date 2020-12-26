const Recipe = require("../models/recipe");

const getAll = async () => {
  var foundRecipes = await Recipe.find({}, { __v: 0 })
    .sort({ createdAt: -1 })
    .populate("creator", { _id: 1, username: 1, firstName: 1, lastName: 1 });
  return foundRecipes;
};

const getByUserId = async (userId) => {
  var foundRecipes = await Recipe.find({ creator: userId }, { __v: 0 })
    .sort({
      createdAt: -1,
    })
    .populate("creator", { _id: 1, username: 1, firstName: 1, lastName: 1 });
  return foundRecipes;
};

const getById = async (recipeId) => {
  var foundRecipe = await Recipe.findOne(
    { _id: recipeId },
    { __v: 0 }
  ).populate("creator", { _id: 1, username: 1, firstName: 1, lastName: 1 });
  return foundRecipe;
};

const create = async (title, description, imagePath, creatorId) => {
  const recipe = new Recipe({
    title: title,
    description: description,
    imagePath: imagePath,
    creator: creatorId,
  });
  const createdRecipe = await recipe
    .save()
    .then((r) =>
      r
        .populate("creator", { _id: 1, username: 1, firstName: 1, lastName: 1 })
        .execPopulate()
    );
  return createdRecipe._doc;
};

const update = async (recipeId, title, description, imagePath, updaterId) => {
  const modifiedRecipe = new Recipe({
    _id: recipeId,
    title: title,
    description: description,
    imagePath: imagePath,
  });

  const result = await Recipe.updateOne(
    { _id: recipeId, creator: updaterId },
    modifiedRecipe
  );
  return result.n > 0 ? true : false;
};

const remove = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndRemove({ _id: recipeId });
  return deletedRecipe;
};

module.exports = { getAll, getByUserId, getById, create, update, remove };
