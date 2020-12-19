const Recipe = require("../models/recipe");

const getAll = async () => {
  var foundRecipes = await Recipe.find();
  return foundRecipes;
};

const getByUserId = async (userId) => {
  var foundRecipes = await Recipe.find({ creator: userId });
  return foundRecipes;
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

module.exports = { getAll, getByUserId, create /*, update, remove*/ };
