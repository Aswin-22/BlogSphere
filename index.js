const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDb } = require("./connect");

const Blog = require("./Models/blog");

const userRouter = require("./Routes/user");
const blogRouter = require("./Routes/blog");

const { checkForAuthentication } = require("./MiddleWare/Authentication");

const app = express();
const port = 5000;

connectDb("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Database Error: ${err}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log(req.user);
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(port, () => console.log(`Server running in port ${port}`));
