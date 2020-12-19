const recipeDAL = require("../DAL/recipe");

const getAll = async () => {
  const foundRecipes = await recipeDAL.getAll();

  return {
    recipeData: { recipes: foundRecipes, count: foundRecipes.length },
    message: "Recipes successfully fetched!",
  };
};

const create = async (title, description, imagePath, creatorId) => {
  const savedRecipe = await recipeDAL.create(
    title,
    description,
    imagePath,
    creatorId
  );

  if (!savedRecipe) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: "Recipe not saved. There was an error.",
      })
    );
  }

  //console.log(savedRecipe);

  return {
    recipe: {
      title: savedRecipe.title,
      description: savedRecipe.description,
      imagePath: savedRecipe.imagePath,
      creator: savedRecipe.creator,
    },
    message: "Your recipe was successfully published.",
  };
};

module.exports = { getAll, create /*, update, remove*/ };
