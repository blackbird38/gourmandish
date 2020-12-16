const express = require("express");

const imageUploadWithMulter = require("../middleware/multer-file-upload");
const jwtCheckAuth = require("../middleware/jwt-check-auth");
const recipeController = require("../controllers/recipe");

const router = express.Router();

router.post("", jwtCheckAuth, imageUploadWithMulter, recipeController.create);

router.get("", recipeController.create);

module.exports = router;
