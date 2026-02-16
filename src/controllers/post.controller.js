const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
};
