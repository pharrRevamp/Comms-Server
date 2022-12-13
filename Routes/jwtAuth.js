const router = require("express").Router();
const sql = require("mssql");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator"); //Creates our tokens
const validInfo = require("../middleware/validInfo"); // Checks if info is the same as in the database
const auth = require("../middleware/auth"); // Checks if token is valid

router.post("/register", validInfo, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const bcryptPassword = await bcrypt.hash(password, salt);
    console.log(bcryptPassword);
    const selectData = "";
    const userCreds = "";
    const post = new sql.Transaction(pool);
    const requestDB = new sql.Request(pool);

    requestDB(selectData, (err, data) => {
      if (data.recordset.length > 0) {
        res.status(401).send("THIS EMAIL ALREADY EXIST!");
        return;
      } // check if the email exist already or not
      pool // beginning to connect to the database
        .connect()
        .then(() => {
          post // begin to start submit our request
            .begin()
            .then(() => {
              requestDB.query(userCreds, data).then(() => {
                post // we are committing to our request
                  .commit()
                  .then(() => {
                    // using the username we got to generate a token for the user
                    const token = jwtGenerator(username);
                    res.json({ token: token });
                  })
                  .catch(err => {
                    res.status(500).send(err);
                  });
              });
            })
            .catch(err => {
              res.status(500).send(err);
            })
            .catch(err => {
              res.status(500).send(err);
            });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    });
  } catch (err) {
    res.status(500).send("ERROR WITH REGISTERING PLEASE TRY AGAIN");
  }
});

// pool
//   .connect()
//   .begin()
//   .then(() => {
//     requestDB.query(userCreds, data).then(() => {
//       post // we are committing to our request
//         .commit()
//         .then(() => {
//           // using the username we got to generate a token for the user
//           const token = jwtGenerator(username);
//           res.json({ token: token });
//         })
//         .catch(err => {
//           res.status(500).send(err);
//         });
//     });
//   })
//   .catch(err => {
//     res.status(500).send(err);
//   });

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const selectData = "";
  try {
    const requestDB = new sql.Request(pool);

    async function validateHandler(ps, objCred, objId, un) {
      const validPassword = await bcrypt.compare(ps, `${objCred}`);
      if (!validPassword) {
        res.status(401).send("Email or Password is incorrectly!");
      } else {
        const token = jwtGenerator(un);
        res.json({ token: token, username: un });
      }
    } // validate handler

    pool
      .connect()
      .then(() => {
        requestDB.query(selectData, (err, data) => {
          if (data.recordset.length >= 0) {
            res.status(401).send("Email or Password is incorrect!");
            return;
          }
          validateHandler(
            password,
            data.recordset[0].password,
            data.recordset[0].user_id,
            data.recordset[0].username
          );
          res.status(200).send("Successful login");
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/is-verified", auth, (req, res) => {
  try {
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
