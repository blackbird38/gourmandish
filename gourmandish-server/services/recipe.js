const recipeDAL = require("../DAL/recipe");
const fs = require("fs");

const getAll = async () => {
  const foundRecipes = await recipeDAL.getAll();

  return {
    recipeData: { recipes: foundRecipes, count: foundRecipes.length },
    message: "Recipes successfully fetched!",
  };
};

const getByUserId = async (userId) => {
  const foundRecipes = await recipeDAL.getByUserId(userId);

  return {
    recipeData: { recipes: foundRecipes, count: foundRecipes.length },
    message: "Recipes successfully fetched!",
  };
};

const getById = async (recipeId) => {
  const foundRecipe = await recipeDAL.getById(recipeId);
  return foundRecipe;
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
  const { __v, ...recipe } = savedRecipe;
  return {
    recipe: recipe,
    message: "Your recipe was successfully published.",
  };
};

const update = async (recipeId, title, description, imagePath, creatorId) => {
  const isUpdated = await recipeDAL.update(
    recipeId,
    title,
    description,
    imagePath,
    creatorId
  );
  if (isUpdated) {
    return getById(recipeId);
  }
};

const remove = async (recipeId) => {
  const deletedRecipe = await recipeDAL.remove(recipeId);
  if (deletedRecipe._id) {
    const filePath = getDiskFilePath(deletedRecipe.imagePath);
    deleteFile(filePath);
    return true;
  }
  return false;
};

const getDiskFilePath = (oldFilename) => {
  const filePath = "./uploads/images/" + oldFilename.split("images/")[1];
  return filePath;
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

module.exports = { getAll, getByUserId, getById, create, update, remove };
