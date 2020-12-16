const express = require("express");

const imageUploadWithMulter = require("../middleware/multer-file-upload");
const jwtCheckAuth = require("../middleware/jwt-check-auth");
const recipeController = require("../controllers/recipe");

const router = express.Router();

router.get("", recipeController.getAll);

router.post("", jwtCheckAuth, imageUploadWithMulter, recipeController.create);

module.exports = router;
