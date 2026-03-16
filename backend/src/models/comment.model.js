const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "username is required for creating a comment"],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required for creating a comment"],
    },
    comment: {
      type: String,
      required: [true, "comment text is required"],
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
