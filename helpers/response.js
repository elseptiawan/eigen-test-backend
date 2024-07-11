const sendResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
};

const validationErrResponse = (res, message, errors = null) => {
  res.status(400).json({
    status: 400,
    message,
    errors,
  });
};

module.exports = { sendResponse, validationErrResponse };