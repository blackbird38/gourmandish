const Recipe = require("../models/recipe");

const getAll = async () => {
  var foundRecipes = await Recipe.find();
  return foundRecipes;
};

const create = async (recipe) => {
  const newRecipe = new Recipe(recipe);
  const createdRecipe = await newRecipe.save();
  return createdRecipe._doc;
};

module.exports = { getAll, create /*, update, remove*/ };
