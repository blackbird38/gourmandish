const express = require("express");
const jwtCheckAuth = require("../middleware/jwt-check-auth");
const userController = require("../controllers/user");

const router = express.Router();

// router.get("", userController.getAll);
router.get("/:userId", jwtCheckAuth, userController.getById);
router.put("/follow/:userId", jwtCheckAuth, userController.toggleFollow);
router.get("/followers/:userId", userController.getFollowers);
// router.post("", userController.create);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.remove);
// router.get("/nearby", userController.getAllNearby);

module.exports = router;
