const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: String,
    followee: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
      message : "staus can be pending , accepted or rejected only"
    },
  },
  { timestamps: true },
);

followSchema.index({follower : 1 , followee : 1},{unique: true})

const followModel = mongoose.model("follow" , followSchema);

module.exports = followModel;