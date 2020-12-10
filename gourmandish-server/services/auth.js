const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authDAL = require("../DAL/auth");

const isUsernameAvailable = async (username) => {
  const usernameAvailability = await authDAL.isUsernameAvailable(username);

  if (!usernameAvailability) {
    throw new Error(
      JSON.stringify({
        code: 401,
        message: "This username is not available.",
      })
    );
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
    throw new Error(
      JSON.stringify({
        code: 401,
        message: "Something wrong with the username, email or password.",
      })
    );
  }

  const foundUser = await authDAL.find(credentials.username, credentials.email);

  if (foundUser != null) {
    if (credentials.username === foundUser.username) {
      throw new Error(
        JSON.stringify({
          code: 401,
          message: "Username already in use.",
        })
      );
    }
    if (credentials.email === foundUser.email) {
      throw new Error(
        JSON.stringify({
          code: 401,
          message: "Email already in use.",
        })
      );
    }
  }

  return await bcrypt
    .hash(credentials.password, 10)
    .then(async (encryptedPassword) => {
      const newUser = { ...credentials };
      newUser.password = encryptedPassword;
      newUser.roles = ["user"];
      return await authDAL.saveUser(newUser).then((savedUser) => {
        if (!savedUser) {
          throw new Error(
            JSON.stringify({
              code: 422,
              message: "Account not created. Try again",
            })
          );
        }

        return {
          user: { ...savedUser }, //TODO: remove password from here
          message: "Successful signup.",
        };
      });
    });
};

const signIn = async (credentials) => {
  if (!isSignInDataValid(credentials.usernameOrEmail, credentials.password)) {
    throw new Error(
      JSON.stringify({
        code: 401,
        payload: {
          message: "Invalid data. Make sure each field has a valid value.",
        },
      })
    );
  }

  const foundUser = await authDAL.findByUsernameOrEmail(
    credentials.usernameOrEmail
  );
  // console.log(foundUser);
  if (foundUser === null) {
    throw new Error(
      JSON.stringify({
        code: 401,
        message: "Authentication failed! User not found.",
      })
    );
  }

  if (!(await isPasswordValid(credentials.password, foundUser.password))) {
    throw new Error(
      JSON.stringify({
        code: 401,
        message: "Authentication failed! Wrong password.",
      })
    );
  }

  const token = generateToken(foundUser.email, foundUser._id);

  return {
    authData: {
      token: token,
      userId: foundUser._id,
    },
    message: "Authentication successful.",
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
