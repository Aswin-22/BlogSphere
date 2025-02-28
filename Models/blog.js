const { Schema, model } = require("mongoose");

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timeStamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
