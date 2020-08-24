const { errorType } = require("./constants");

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

module.exports.GetErrorCode = getErrorCode;
