const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authDAL = require("../DAL/auth");

const isUsernameAvailable = async (req, res, next) => {
  console.log("[POST] api/auth/username", { username: req.body.username });
  const { username } = req.body;
  return await authDAL
    .isUsernameAvailable(username)
    .then((isUsernameAvailable) => {
      if (isUsernameAvailable) {
        res.status(200).send({ isUsernameAvailable });
      } else {
        res.status(422).send({ message: "The username is not available." });
      }
    });
};

const signUp = async (req, res, next) => {
  console.log("[POST] api/auth/signup", {
    credentials: req.body.credentials,
  });

  const { credentials } = req.body;

  if (
    !isSignUpDataValid(
      credentials.username,
      credentials.email,
      credentials.password
    )
  ) {
    {
      res.status(401).send({
        message: "Invalid data. Make sure each field has a valid value.",
      });
    }
  }

  const foundUser = await authDAL
    .find(credentials.username, credentials.email)
    .catch((error) => {
      console.log(error);
      res.status(422).send({
        message: "Something went wrong.",
      });
    });

  if (foundUser != null) {
    let message;
    if (credentials.email === foundUser.email) {
      message = "Email already in use.";
    } else {
      message = "Username already in use.";
    }
    res.status(401).send({ message });
  }

  bcrypt.hash(credentials.password, 10).then(async (encryptedPassword) => {
    const newUser = { ...credentials };
    newUser.password = encryptedPassword;
    newUser.roles = ["user"];
    return await authDAL.saveUser(newUser).then((savedUser) => {
      if (savedUser) {
        res.status(200).send({
          user: { ...savedUser }, //TODO: remove password from here
          message: "Successful signup.",
        });
      }
    });
  });
};

const signIn = async (req, res, next) => {
  console.log("[POST] api/auth/signin");

  const { credentials } = req.body;

  console.log(req.body);

  if (!isSignInDataValid(credentials.usernameOrEmail, credentials.password)) {
    res.status(401).send({
      message: "Invalid data. Make sure each field has a valid value.",
    });
  }

  const foundUser = await authDAL
    .findByUsernameOrEmail(credentials.usernameOrEmail)
    .catch((error) => {
      console.log(error);
      res.status(422).send({
        message: "Something went wrong.",
      });
    });

  console.log(foundUser);

  if (foundUser === null) {
    return res.status(401).json({
      message: "Authentification failed! User not found.",
    });
  }

  if (!(await isPasswordValid(credentials.password, foundUser.password))) {
    return res.status(401).json({
      message: "Authentification failed! Wrong password.",
    });
  }

  const token = generateToken(foundUser.email, foundUser._id);

  res.status(200).json({
    tokenData: {
      token: token,
      expiresIn: 3600,
      userId: foundUser._id,
    },
    message: "Authentication successful.",
  });
};

const isSignUpDataValid = (username, email, password) => {
  return username && email && password;
};

const isSignInDataValid = (usernameOrEmail, password) => {
  return usernameOrEmail && password;
};

const isPasswordValid = async (loginPassword, dbPassword) => {
  return await bcrypt.compare(loginPassword, dbPassword);
};

const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { isUsernameAvailable, signUp, signIn };
