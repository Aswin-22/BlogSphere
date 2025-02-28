const { verifyToken } = require("../services/auth");

function checkForAuthentication(tokenName) {
  return (req, res, next) => {
    const token = req.cookies[tokenName];

    if (!token) return next();

    try {
      const payLoad = verifyToken(token);
      req.user = payLoad;
    } catch (error) {
      console.log(error);
    }
    return next();
  };
}

module.exports = { checkForAuthentication };
