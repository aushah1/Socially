const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "username is required for saving a post"],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required for saving a post"],
    },
  },
  { timestamps: true },
);

const saveModel = mongoose.model("save", saveSchema);
module.exports = saveModel;
