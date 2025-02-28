const jwt = require("jsonwebtoken");
const user = require("../Models/user");

const key = "uchihaItachi22";

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImg: user.profileImg,
    role: user.role,
  };

  const token = jwt.sign(payload, key);
  return token;
}

function verifyToken(token) {
  const payload = jwt.verify(token, key);
  return payload;
}

module.exports = { generateToken, verifyToken };
