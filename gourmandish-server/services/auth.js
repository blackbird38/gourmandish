const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authDAL = require("../DAL/auth");

const isUsernameAvailable = async (username) => {
  const usernameAvailability = await authDAL.isUsernameAvailable(username);
  if (!usernameAvailability) {
    throw new Error("The username is not available.");
  }
  return { isUsernameAvailable: usernameAvailability };
};

const signUp = async (credentials) => {
  if (
    !isSignUpDataValid(
      credentials.username,
      credentials.email,
      credentials.password
    )
  ) {
    return {
      code: 401,
      payload: {
        message: "Invalid credentials: username, email and password.",
      },
    };
  }

  const foundUser = await authDAL.find(credentials.username, credentials.email);

  if (foundUser != null) {
    if (credentials.email === foundUser.email) {
      return { code: 401, payload: { message: "Email already in use." } };
    } else {
      return { code: 401, payload: { message: "Username already in use." } };
    }
  }

  return await bcrypt
    .hash(credentials.password, 10)
    .then(async (encryptedPassword) => {
      const newUser = { ...credentials };
      newUser.password = encryptedPassword;
      newUser.roles = ["user"];
      return await authDAL.saveUser(newUser).then((savedUser) => {
        if (savedUser) {
          return {
            code: 200,
            payload: {
              user: { ...savedUser }, //TODO: remove password from here
              message: "Successful signup.",
            },
          };
        }
        return { code: 422, payload: { message: "Something went wrong." } };
      });
    });
};

const signIn = async (credentials) => {
  if (!isSignInDataValid(credentials.usernameOrEmail, credentials.password)) {
    return {
      code: 401,
      payload: {
        message: "Invalid data. Make sure each field has a valid value.",
      },
    };
  }

  const foundUser = await authDAL.findByUsernameOrEmail(
    credentials.usernameOrEmail
  );

  if (foundUser === null) {
    return {
      code: 401,
      payload: {
        message: "Authentication failed! User not found.",
      },
    };
  }

  if (!(await isPasswordValid(credentials.password, foundUser.password))) {
    return {
      code: 401,
      payload: {
        message: "Authentication failed! Wrong password.",
      },
    };
  }

  const token = generateToken(foundUser.email, foundUser._id);

  return {
    code: 200,
    payload: {
      authData: {
        token: token,
        userId: foundUser._id,
      },
      message: "Authentication successful.",
    },
  };
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

module.exports = {
  isUsernameAvailable,
  signUp,
  signIn,
};
