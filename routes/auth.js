const router = require("express").Router();

const User = require("../models/User");

router.post("/register", (req, res) => {
  console.log("Hello!");
});

module.exports = router;
