function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;

  const errorDetails =
    process.env.NODE_ENV !== "production" ? err.stack : undefined;

  res.error(status, err.message, errorDetails);
}

module.exports = errorHandler;
