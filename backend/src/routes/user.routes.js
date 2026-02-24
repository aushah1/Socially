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

userRouter.get(
  "/followrequest/accept/:username",
  identify.identifyUser,
  userController.acceptFollowRequestController,
);
userRouter.get(
  "/followrequest/reject/:username",
  identify.identifyUser,
  userController.rejectFollowRequestController,
);

userRouter.get("/getme", identify.identifyUser, userController.getMeController);

module.exports = userRouter;
