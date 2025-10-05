const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const { reqAuth, reqAdmin } = require("../middlewares/auth_Admin.js");

router.get("/auth/me", reqAuth, usersController.getUser);
router.post("/auth/register", usersController.registerUser);
router.post("/auth/login", usersController.loginUser);

router.get("/usuarios", reqAuth, reqAdmin, usersController.admin_getUsers);
router.put("/usuarios/:id", reqAuth, reqAdmin, usersController.updateUser);
router.delete(
  "/usuarios/:id",
  reqAuth,
  reqAdmin,
  usersController.admin_deleteUser
);

module.exports = router;
