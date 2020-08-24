exports.errorName = {
  UNAUTHORIZED: "UNAUTHORIZED",
  BADREQUEST: "BADREQUEST",
};

exports.errorType = {
  UNAUTHORIZED: {
    message: "Authentication is need to get requested response!",
    statusCode: 401,
  },
  BADREQUEST: {
    message: "User with this email is already registered!",
    statusCode: 400,
  },
};
