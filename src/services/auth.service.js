const userModel = require("@/models/user.model");
const HttpError = require("@/utils/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async ({ email, password }) => {
  const isExistUser = await userModel.findByEmail(email);
  if (isExistUser) {
    throw HttpError(409, "Email already exists");
  }
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(String(password), saltRounds);
  const user = await userModel.createUser(email, hashPassword);

  const accessToken = jwt.sign({ sub: user.id }, process.env.AUTH_JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    user: { id: user.id, email },
    access_token: accessToken,
  };
};

exports.login = async (data = {}) => {
  const { email, password } = data;
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw HttpError(401, "Invalid credentials");
  }
  const isValid = await bcrypt.compare(String(password), user.password);
  if (!isValid) throw HttpError(401, "Invalid credentials");
  const accessToken = jwt.sign({ sub: user.id }, process.env.AUTH_JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    user: { id: user.id, email: user.email },
    access_token: accessToken,
  };
};
