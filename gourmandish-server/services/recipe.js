const recipeDAL = require("../DAL/recipe");

const getAll = async () => {
  var foundRecipes = await recipeDAL.find();
  return {
    recipeData: { recipes: foundRecipes, count: count(foundRecipes) },
    message: "Here are your recipes.",
  };
};

const create = async () => {};

module.exports = { getAll, create, update, remove };
