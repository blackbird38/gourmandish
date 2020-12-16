const express = require("express");

const imageUploadWithMulter = require("../middleware/multer-file-upload");
const recipeController = require("../controllers/recipe");

const router = express.Router();

router.post("", imageUploadWithMulter, recipeController.create);

router.get("", recipeController.create);

module.exports = router;
