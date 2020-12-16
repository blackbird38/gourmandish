const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("", userController.getAll);
router.post("", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.get("/nearby", userController.getAllNearby);

module.exports = router;

/*
module.exports = (app) => {
  app.get("/api/users", userController.getAll);
  app.post("/api/users", userController.create);
  app.put("/api/users/:id", userController.update);
  app.delete("/api/users/:id", userController.remove);
  app.get("/api/users/nearby", userController.getAllNearby);

  app.post("/api/auth/username", authController.isUsernameAvailable);
  app.post("/api/auth/signup", authController.signUp);
  app.post("/api/auth/signin", authController.signIn);
};*/
