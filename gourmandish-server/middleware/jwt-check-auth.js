const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer token" token is at idx 1
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // will use the user id to add it when a new recipe is added
    // passing this to be used by the create a new recipe
    // any middelware running after this jwt-check-auth will get this piece of info:
    req.jwtLoggedInUser = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
    // of valid token:
    next(); // execution continues
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated. Token error.",
    });
  }
};
