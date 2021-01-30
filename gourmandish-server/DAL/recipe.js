const Recipe = require("../models/recipe");

const getAll = async () => {
  const foundRecipes = await Recipe.find({}, { __v: 0 })
    .sort({ createdAt: -1 })
    .populate("creator", {
      _id: 1,
      username: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
    });
  return foundRecipes;
};

const getByUserId = async (userId) => {
  const foundRecipes = await Recipe.find({ creator: userId }, { __v: 0 })
    .sort({
      createdAt: -1,
    })
    .populate("creator", {
      _id: 1,
      username: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
    });
  return foundRecipes;
};

const getById = async (recipeId) => {
  const foundRecipe = await Recipe.findOne(
    { _id: recipeId },
    { __v: 0 }
  ).populate("creator", {
    _id: 1,
    username: 1,
    firstName: 1,
    lastName: 1,
    avatar: 1,
  });
  return foundRecipe;
};

const create = async (title, description, imagePath, creatorId) => {
  const recipe = new Recipe({
    title: title,
    description: description,
    imagePath: imagePath,
    creator: creatorId,
    likes: [],
  });
  const createdRecipe = await recipe.save().then((r) =>
    r
      .populate("creator", {
        _id: 1,
        username: 1,
        firstName: 1,
        lastName: 1,
        avatar: 1,
      })
      .execPopulate()
  );
  return createdRecipe._doc;
};

const update = async (
  recipeId,
  title,
  description,
  imagePath,
  updaterId,
  likes
) => {
  const modifiedRecipe = new Recipe({
    _id: recipeId,
    title: title,
    description: description,
    imagePath: imagePath,
    likes: likes,
  });

  const result = await Recipe.updateOne(
    { _id: recipeId, creator: updaterId },
    {
      $set: {
        ...modifiedRecipe,
      },
    }
  );
  return result.n > 0 ? true : false;
};

const remove = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndRemove({ _id: recipeId });
  return deletedRecipe;
};

const toggleLike = async (recipeId, like, requesterId) => {
  let result = null;
  if (like) {
    result = await Recipe.updateOne(
      { _id: recipeId },
      { $addToSet: { likes: requesterId } }
    );
  } else {
    result = await Recipe.updateOne(
      { _id: recipeId },
      { $pull: { likes: requesterId } }
    );
  }
  return result.n > 0 ? true : false;
};

const getLikedByUserId = async (userId) => {
  const foundRecipes = await Recipe.find({ likes: userId }, { __v: 0 })
    .sort({
      createdAt: -1,
    })
    .populate("creator", {
      _id: 1,
      username: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
    });
  return foundRecipes;
};

const search = async (term) => {
  const foundRecipes = await Recipe.find(
    { title: { $regex: `.*${term}.*`, $options: "i" } },
    { __v: 0 }
  )
    .sort({ createdAt: -1 })
    .populate("creator", {
      _id: 1,
      username: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
    });
  return foundRecipes;
};

module.exports = {
  getAll,
  getByUserId,
  getById,
  create,
  update,
  remove,
  toggleLike,
  getLikedByUserId,
  search,
};
