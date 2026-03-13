const userModel = require("@/models/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1]?.trim();
    if (!accessToken) return res.error(401, "Unauthorized!");
    const payload = jwt.verify(accessToken, process.env.AUTH_JWT_SECRET);

    const user = await userModel.findById(payload.sub);
    if (!user) {
      return res.error(401, "User not found");
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.error(401, "Invalid or expired token");
  }
};
