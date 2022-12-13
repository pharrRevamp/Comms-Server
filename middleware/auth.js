const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const jwtToken = req.header("token");

  if (!jwtToken) {
    res.status(403).send("NOT AUTHORIZED, TOKEN DOES NOT EXIST!");
    return;
  }

  try {
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    res.status(500).send("ERROR WITH TOKEN, PLEASE TRY AGAIN");
  }
};
