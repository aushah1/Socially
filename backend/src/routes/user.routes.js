const express = require("express");
const userController = require("../controllers/user.controller");
const identify = require("../middlewares/auth.middleware");
const userRouter = express.Router();

// /api/users
userRouter.get(
  "/follow/:username",
  identify.identifyUser,
  userController.followController,
);
userRouter.get(
  "/unfollow/:username",
  identify.identifyUser,
  userController.unFollowController,
);

userRouter.get("/followrequest/accept/:username", identify.identifyUser, userController.acceptFollowRequest);
userRouter.get("/followrequest/reject/:username", identify.identifyUser, userController.rejectFollowRequest);


module.exports = userRouter;
