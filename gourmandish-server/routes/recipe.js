const recipeController = require("../controllers/recipe");

module.exports = (app) => {
  app.get("/api/recipes", recipeController.getAll);
  app.post("/api/recipes", recipeController.create);
  app.put("/api/recipes/:id", recipeController.update);
  app.delete("/apirecipe/:id", recipeController.remove);
};
