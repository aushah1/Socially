const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const commentModel = require("../models/comment.model");
const saveModel = require("../models/save.model");

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
      const isSaved = await saveModel.findOne({
        user: user.username,
        post: post._id,
      });
      const likes = await likeModel.find({
        post: post._id,
      });
      const comments = await commentModel
        .find({ post: post._id })
        .sort({ createdAt: -1 })
        .lean();

      post.isLiked = Boolean(isLiked);
      post.isSaved = Boolean(isSaved);
      post.likes = likes.length;
      post.comments = comments;
      post.commentCount = comments.length;
      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched successfully.",
    posts,
  });
}

async function savePostController(req, res) {
  const postId = req.params.postId;
  const user = req.user.username;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const existingSave = await saveModel.findOne({ user, post: postId });
  if (existingSave) {
    await saveModel.findByIdAndDelete(existingSave._id);
    return res.status(200).json({ message: "Post unsaved" });
  }

  const savedPost = await saveModel.create({ user, post: postId });
  res.status(201).json({ message: "Post saved", savedPost });
}

async function getSavedPostsController(req, res) {
  const user = req.user.username;
  const savedRecords = await saveModel.find({ user }).populate({
    path: "post",
    populate: { path: "user", select: "username fullName profileImage" },
  });

  const savedPosts = [];
  for (const record of savedRecords) {
    if (!record.post) {
      continue;
    }
    const postObject = record.post.toObject
      ? record.post.toObject()
      : record.post;
    const likesCount = await likeModel.countDocuments({ post: postObject._id });
    const commentsCount = await commentModel.countDocuments({
      post: postObject._id,
    });

    savedPosts.push({
      ...postObject,
      savedAt: record.createdAt,
      likes: likesCount,
      commentCount: commentsCount,
      isSaved: true,
    });
  }

  res.status(200).json({
    message: "Saved posts fetched successfully",
    savedPosts,
  });
}

async function createCommentController(req, res) {
  const { postId } = req.params;
  const { comment } = req.body;

  if (!comment || comment.trim().length === 0) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const newComment = await commentModel.create({
    user: req.user.username,
    post: postId,
    comment: comment.trim(),
  });

  res.status(201).json({
    message: "Comment added successfully",
    comment: newComment,
  });
}

async function getCommentsController(req, res) {
  const { postId } = req.params;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comments = await commentModel
    .find({ post: postId })
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Comments fetched successfully",
    comments,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
  likeController,
  getFeedController,
  createCommentController,
  savePostController,
  getSavedPostsController,
  getCommentsController,
};
