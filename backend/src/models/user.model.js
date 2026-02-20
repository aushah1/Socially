const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username name already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "email  already exists"],
    required: [true, "email is required"],
  },
  password :{
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage :{
    type: String,
    default : "https://ik.imagekit.io/4aj3hgui6v/default.jfif"
  }
});


const userModel = mongoose.model("users", userSchema)

module.exports = userModel