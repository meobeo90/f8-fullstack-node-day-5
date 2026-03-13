const userModel = require("@/models/user.model");
const authService = require("@/services/auth.service");
// POST /api/users
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);
    res.success(newUser, 201);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/search?q=email
exports.searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.error(400, "Query q is required");
    }
    const users = await userModel.searchByEmail(q);
    if (!users || users.length === 0) {
      res.error(404, "User not found");
    }
    return res.success(users);
  } catch (error) {
    next(error);
  }
};
