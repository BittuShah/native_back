const jwt = require("jsonwebtoken");
// const config = require("config");

function createJWTToken(fieldObj) {
  const token = jwt.sign(fieldObj, "Native_Backend");

  return token;
}

module.exports.CreateJWTToken = createJWTToken;
