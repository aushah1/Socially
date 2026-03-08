const followModel = require("../models/follow.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followeeUser = await userModel.findOne({ username: followeeUsername });

  if (!followeeUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (followeeUser._id.toString() === followerId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeUser._id,
  });

  if (isFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
      follow: isFollowing,
    });
  }

  const follow = await followModel.create({
    follower: followerId,
    followee: followeeUser._id,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow,
  });
}
async function unFollowController(req, res) {
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followeeUser = await userModel.findOne({ username: followeeUsername });

  if (!followeeUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerId,
    followee: followeeUser._id,
  });

  if (!isFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

async function acceptFollowRequestController(req, res) {
  const followeeId = req.user.id;

  const followerUser = await userModel.findOne({
    username: req.params.username,
  });

  if (!followerUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUser._id,
    followee: followeeId,
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = "accepted";
  await followRequest.save();

  res.status(200).json({
    message: `You have accepted the follow request`,
    followRequest,
  });
}

async function rejectFollowRequestController(req, res) {
  const followeeId = req.user.id;

  const followerUser = await userModel.findOne({
    username: req.params.username,
  });

  if (!followerUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUser._id,
    followee: followeeId,
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = "rejected";
  await followRequest.save();

  res.status(200).json({
    message: `You have rejected the follow request`,
    followRequest,
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  const [posts, followers, following] = await Promise.all([
    postModel.find({ user: user._id }),

    followModel
      .find({ followee: user._id})
      .populate("follower", "username fullName profileImage"),

    followModel
      .find({ follower: user._id})
      .populate("followee", "username fullName profileImage"),
  ]);

  res.status(200).json({
    message: "User Fetched Successfully",
    user: {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      posts,
      followers,
      following,
    },
  });
}

async function getAllUsersController(req, res) {
  const users = await userModel.find();
  res.status(200).json({
    message: "Users fetched Successfully",
    users,
  });
}
async function getRequestsController(req, res) {
  const requests = await followModel
    .find({
      followee: req.user.id,
      status: "pending",
    })
    .populate("follower", "username fullName profileImage");
  res.status(200).json({
    message: "Requests fetched Successfully",
    requests,
  });
}
module.exports = {
  followController,
  unFollowController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getMeController,
  getAllUsersController,
  getRequestsController,
};
