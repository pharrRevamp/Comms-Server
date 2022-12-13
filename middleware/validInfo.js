module.exports = function (req, res, next) {
  const { email, username, password } = req.body;

  // check if the user has a valid email
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // if any of the fields are missing return missing credentails for auth/creating account
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      // see if the email is valid or not
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    // if any of the fields are missing return missing credentails for login
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      // see if the email is valid or not
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
