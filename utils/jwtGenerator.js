const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  console.log(user_id);
  const payload = {
    user: {
      id: user_id,
    },
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "8hr" });
}

module.exports = jwtGenerator;
