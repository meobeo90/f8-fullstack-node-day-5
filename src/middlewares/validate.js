const validate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.error(400, "Email and password are required");
  }
  next();
};

module.exports = validate;
