const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") console.log(err);
  const error = { ...err };
  error.message = err.message;
  error.name = err.name;
  if (error.code == 11000) {
    error.message = `Entered ${[Object.keys(error.keyPattern)]} already exists`;
    error.status = 401;
    new ErrorResponse(error.message, error.status);
  }
  res
    .status(error.status || 500)
    .json({ success: false, error: error.message || "Internal Server Error" });
};

module.exports = errorHandler;
