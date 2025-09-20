const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");

router.get("/users", usersController.getUsers);

router.get("/auth/me", usersController.getUser);
router.post("/auth/register", usersController.registerUser);
router.post("/auth/login", usersController.loginUser);

router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);


module.exports = router;
