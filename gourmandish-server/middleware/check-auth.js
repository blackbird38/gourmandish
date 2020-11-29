// will be used to protect routes
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer token" token is at idx 1
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // will use the user id to add new data (like recipes, etc)
    // any middelware running after this check-auth will get this piece of info:
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    // of valid token:
    next(); // execution continues
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated. Token err.",
    });
  }
};

module.exports = { checkAuth };
