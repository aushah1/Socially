const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: { type: String, default: "" },
  imageUrl: {
    type: String,
    required: [true, "Image is required for creating an post "],
  },
  user : {
    ref : "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true , "UserId is required "]
  }
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
