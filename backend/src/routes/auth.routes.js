const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("profileImage"),
  authController.registerController,
);

authRouter.post("/login", authController.loginController);

module.exports = authRouter;
