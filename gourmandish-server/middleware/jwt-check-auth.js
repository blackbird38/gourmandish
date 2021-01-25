const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(
      "[JWT-CHAECK-AUTH] hearder authorization",
      req.headers.authorization
    );
    const token = req.headers.authorization.split(" ")[1]; // "Bearer token" token is at idx 1
    console.log("[JWT-CHAECK-AUTH] token", token);
    console.log("[JWT-CHAECK-AUTH] secret", process.env.JWT_SECRET_KEY);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // will use the user id to add it when a new recipe is added
    console.log("decodedToken", decodedToken);
    printExpiringTokenDate(decodedToken.exp);
    // passing this to be used by the create a new recipe
    // any middelware running after this jwt-check-auth will get this piece of info:
    req.jwtLoggedInUser = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };

    console.log(req.jwtLoggedInUser);
    // of valid token:
    next(); // execution continues
  } catch (error) {
    console.error("[JWT-CHAECK-AUTH] Error", error);
    res.status(401).json({
      message: "You are not authenticated. Token error.",
    });
  }
};

printExpiringTokenDate = (expTime) => {
  const d = new Date(0);
  d.setUTCSeconds(expTime);
  console.log("SignIn Token will expire on: ", d);
};
