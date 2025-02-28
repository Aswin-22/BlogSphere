const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectDb(path) {
  return mongoose.connect(path);
}

module.exports = { connectDb };
