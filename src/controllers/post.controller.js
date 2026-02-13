const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;

  let user = null;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json("Unauthorized Acess");
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone/",
  });

  let post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: user.id,
  });
  res.send(post);
}

module.exports = createPostController;
