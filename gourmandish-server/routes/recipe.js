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
router.delete("/:recipeId", jwtCheckAuth, recipeController.remove);

router.get("/user/:userId", recipeController.getByUserId);

router.put("/like/:recipeId", jwtCheckAuth, recipeController.toggleLike);
router.get("/likes/:userId", jwtCheckAuth, recipeController.getLikedByUserId);

router.get("/search/:term", jwtCheckAuth, recipeController.search);

module.exports = router;
