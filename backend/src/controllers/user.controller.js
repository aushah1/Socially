const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  if (followee == follower) {
    res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  let user = await userModel.findOne({ username: req.params.username });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  const isFollowing = await followModel.findOne({ followee, follower });
  if (isFollowing) {
    res.status(200).json({
      message: `You are already folllowing ${followee}`,
      follow: isFollowing,
    });
  }
  const follow = await followModel.create({ followee, follower });

  res.status(201).json({
    message: `You are now following ${followee}`,
    follow,
  });
}
async function unFollowController(req, res) {
  const followee = req.user.username;
  const follower = req.params.username;

  let user = await userModel.findOne({ username: req.params.username });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  const isFollowing = await followModel.findOne({ followee, follower });
  if (!isFollowing) {
    res.status(200).json({
      message: `You are not folllowing ${follower}`,
    });
  }
  const follow = await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${follower}`,
    follow,
  });
}

async function acceptFollowRequestController(req, res) {
  const followee = req.user.username;
  const follower = req.params.username;

  let followRequest = await followModel.findOne({ followee, follower });
  if (!followRequest) {
    res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = "accepted";
  await followRequest.save();
  res.status(200).json({
    message: `You have accepted the follow request from ${follower}`,
    followRequest,
  });
}

async function rejectFollowRequestController(req, res) {
  const followee = req.user.username;
  const follower = req.params.username;

  let followRequest = await followModel.findOne({ followee, follower });
  if (!followRequest) {
    res.status(404).json({
      message: "Follow request not found",
    });
  }

  followRequest.status = "rejected";
  await followRequest.save();
  res.status(200).json({
    message: `You have rejected the follow request from ${follower}`,
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

  res.status(200).json({
    message: "User Fetched Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  followController,
  unFollowController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getMeController,
};
