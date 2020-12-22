const express = require("express");

const imageUploadWithMulter = require("../middleware/multer-file-upload");
const jwtCheckAuth = require("../middleware/jwt-check-auth");
const recipeController = require("../controllers/recipe");

const router = express.Router();

router.get("", recipeController.getAll);
router.get("/:recipeId", recipeController.getById);
router.post("", jwtCheckAuth, imageUploadWithMulter, recipeController.create);
router.put(
  "/:recipeId",
  jwtCheckAuth,
  imageUploadWithMulter,
  recipeController.update
);

router.get("/user/:userId", recipeController.getByUserId);

module.exports = router;
