const authService = require("../services/auth");

const isUsernameAvailable = async (req, res, next) => {
  console.log("[POST] api/auth/username");
  try {
    const { username } = req.body;
    const result = await authService.isUsernameAvailable(username);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const signUp = async (req, res, next) => {
  console.log("[POST] api/auth/signup");

  try {
    const { credentials } = req.body;
    const result = await authService.signUp(credentials);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const signIn = async (req, res, next) => {
  console.log("[POST] api/auth/signin");

  try {
    const { credentials } = req.body;
    // console.log(req.headers);
    const result = await authService.signIn(credentials);
    res.status(200).send(result);
  } catch (e) {
    const error = parseError(e);
    res.status(error.code).send({ message: error.message });
  }
};

const parseError = (e) => {
  const error = JSON.parse(e.message);
  const code = error.code || 500;
  const message = error.message || e.message;
  return {
    code: code,
    message: message,
  };
};

module.exports = { isUsernameAvailable, signUp, signIn };
