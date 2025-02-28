const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const Blog = require("../Models/blog");
const Comment = require("../Models/comment");

// Ensure absolute path to uploads directory
const uploadDirectory = path.join(__dirname, "../public/uploads");

// Verify/create upload directory
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/add-new-blog", (req, res) => {
  console.log(req.user);
  return res.render("addBlog", { user: req.user });
});

//Storing blog data when creating one
router.post("/", upload.single("coverImg"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user.id,
    coverImg: `uploads/${req.file.filename}`,
  });
  return res.redirect("/");
});

//Show Blog content with Id
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log(req.user.id);
  if (!blog) return res.redirect("/");
  console.log(comments);
  return res.render("blog", {
    blog,
    user: req.user,
    comments,
  });
});

//Comments Post Method Handle
router.post("/comment/:blogId", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    createdBy: req.user.id,
    blogId: req.params.blogId,
  });
  console.log("User Id:" + req.user.id);
  console.log(comment);
  res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;


