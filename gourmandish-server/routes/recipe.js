const express = require("express");

const imageUploadWithMulter = require("../middleware/multer-file-upload");
const recipeController = require("../controllers/recipe");

const router = express.Router();

router.post("", imageUploadWithMulter, recipeController.create);

router.get("", recipeController.create);

module.exports = router;
/*
module.exports = (app) => {
  app.get("/api/recipes", recipeController.getAll);
  app.post("/api/recipes", recipeController.create);
  // app.put("/api/recipes/:id", recipeController.update);
  //  app.delete("/api/recipes/:id", recipeController.remove);
};
*/
