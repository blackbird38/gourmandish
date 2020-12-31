const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("", userController.getAll);
router.get("/:userId", userController.getById);
router.post("", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.get("/nearby", userController.getAllNearby);

module.exports = router;
