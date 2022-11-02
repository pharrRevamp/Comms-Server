const router = require("express").Router();
const sql = require("mssql");
const pool = require("../db");
require("dotenv").config();

const poolErr = `POOL CLOSED`;
async function close() {
  console.log(poolErr);
  await pool.close();
}

router.post("/kpi-data", async (req, res) => {
  const data = await req.body;
  try {
    const sqlString = ``;
    const requestDB = await new sql.Request(pool);

    await pool
      .connect()
      .then(() => {
        console.log(`POOL OPENED`);
        // beginning of then() & query
        requestDB.query(sqlString, (err, data) => {
          if (err) {
            console.log(
              `ERROR 400: IMPROPER SYNTAX, URL, OR THE REQUEST MAY BE TOO LARGE, PLEASE TRY AGAIN.`
            );
            res.status(400).send(err);
            close();
            return;
          }
          console.log(`DATA SUCCESSFULLY POSTING INTO DATABASE`);
          res
            .status(200)
            .send(`Software was successfully added into database at ${Date()}`);
          // end of query
        });
        // end of then()
      })
      .catch(err => {
        console.log(`UNABLE TO CONNECT TO DATABASE FOR PUTTING IN DATA`);
        res.status(500).send(err);
        close();
        // end of level 2 catch
      });
  } catch (err) {
    console.log(`UNABLE TO CONNECT TO USE ROUTE FOR PUTTING IN DATA`);
    res.status(500).send(err);
    close();
    // end of level 1 catch
  }
});

module.exports = router;
