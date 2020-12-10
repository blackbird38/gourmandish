const authService = require("../services/auth");

const isUsernameAvailable = async (req, res, next) => {
  console.log("[POST] api/auth/username", { username: req.body.username });
  try {
    const { username } = req.body;
    const result = await authService.isUsernameAvailable(username);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const signUp = async (req, res, next) => {
  console.log("[POST] api/auth/signup", {
    credentials: req.body.credentials,
  });

  try {
    const { credentials } = req.body;
    const result = await authService.signUp(credentials);
    res.status(result.code).send(result.payload);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const signIn = async (req, res, next) => {
  console.log("[POST] api/auth/signin");

  try {
    const { credentials } = req.body;
    // console.log(req.headers);

    const result = await authService.signIn(credentials);
    res.status(result.code).send(result.payload);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

module.exports = { isUsernameAvailable, signUp, signIn };
