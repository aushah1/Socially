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
  "/:postId",
  identify.identifyUser,
  postController.getPostDetailsController,
);
postRouter.get(
  "/like/:postId",
  identify.identifyUser,
  postController.likeController,
);



module.exports = postRouter;
