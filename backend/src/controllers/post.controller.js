const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone/",
  });

  let post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id,
  });
  res.send(post);
}

async function getPostsController(req, res) {
  let posts = await postModel.find({ user: req.user.id });

  res.status(200).json({
    message: "Posts fetced Successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  let post = await postModel.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }
  let isOwner = post.user.toString() == req.user.id;
  if (!isOwner) {
    return res.status(401).json({
      message: "You cannot access othes post ",
    });
  }

  res.status(200).json({
    message: "Post fetched Successfully",
    post,
  });
}

async function likeController(req, res) {
  const user = req.user.username;
  const post = req.params.postId;

  let isPost = await postModel.findById(post);

  if (!isPost) {
    res.status(404).json({
      message: "Post not found",
    });
  }

  let isLiked = await likeModel.findOne({ user, post });

  if (isLiked) {
    await likeModel.findByIdAndDelete(isLiked._id);
    return res.status(200).json({
      message: "Post unliked Successfully",
    });
  }

  const like = await likeModel.create({ user, post });
  res.status(200).json({
    message: "Post liked Successfully",
    like,
  });
}

async function getFeedController(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      });
      const likes = await likeModel.find({
        post: post._id,
      });
      post.isLiked = Boolean(isLiked);
      post.likes = likes.length;
      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched successfully.",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
  likeController,
  getFeedController,
};
