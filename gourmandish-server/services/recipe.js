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

const update = async (
  recipeId,
  title,
  description,
  imagePath,
  updaterId,
  isNewFileUploaded
) => {
  let oldFilePath = "";
  const canUpdate = await userCanUpdate(updaterId, recipeId);

  if (!canUpdate) {
    throw new Error("You are not authorized to update this recipe.");
  }

  if (isNewFileUploaded) {
    oldFilePath = await getOldFilePath(recipeId);
  }

  const isUpdated = await recipeDAL.update(
    recipeId,
    title,
    description,
    imagePath,
    updaterId
  );
  if (isUpdated) {
    deleteFile(oldFilePath);
    return await getById(recipeId);
  }
};

const remove = async (recipeId, requesterId) => {
  const canDelete = await userCanUpdate(requesterId, recipeId);
  if (!canDelete) {
    throw new Error("You are not authorized to delete this recipe.");
  }
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

const getOldFilePath = async (recipeId) => {
  const oldRecipe = await getById(recipeId);
  const oldFilename = oldRecipe.imagePath;
  return getDiskFilePath(oldFilename);
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

// TODO: err if no file uploaded

const userCanUpdate = async (userId, recipeId) => {
  const recipe = await getById(recipeId);
  const creatorId = recipe.creator._id;
  return creatorId == userId;
};

module.exports = { getAll, getByUserId, getById, create, update, remove };

// TODO: if the files are deleted from the disk or imagePath not point to a file, display a generic image
