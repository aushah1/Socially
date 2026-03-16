const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const identify = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

// /api/posts

postRouter.post(
  "/",
  upload.single("image"),
  identify.identifyUser,
  postController.createPostController,
);
postRouter.get("/", identify.identifyUser, postController.getPostsController);

postRouter.get(
  "/feed",
  identify.identifyUser,
  postController.getFeedController,
);
postRouter.get(
  "/like/:postId",
  identify.identifyUser,
  postController.likeController,
);
postRouter.get(
  "/save/:postId",
  identify.identifyUser,
  postController.savePostController,
);
postRouter.get(
  "/saved",
  identify.identifyUser,
  postController.getSavedPostsController,
);
postRouter.get(
  "/:postId",
  identify.identifyUser,
  postController.getPostDetailsController,
);
postRouter.post(
  "/comment/:postId",
  identify.identifyUser,
  postController.createCommentController,
);
postRouter.get(
  "/comments/:postId",
  identify.identifyUser,
  postController.getCommentsController,
);

module.exports = postRouter;
