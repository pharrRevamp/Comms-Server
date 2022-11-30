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
  const {
    avgDispatchTime,
    numOfHrsTCO,
    pctOfCallsUnder,
    trainHoursEmpl,
    numOfSpecProg,
    pctOfBudgetUsed,
    numOfBudgetAdju,
    ttlNumOfCalls,
    ttlNumOfCallsPharr,
    ttlNumTrans,
    ttlNumILA,
    completionRate,
    pctCriteria,
    pctStaffCert,
    pctCertObtained,
  } = data;

  try {
    const sqlString = `INSERT INTO dbo.CommsKPI (avgDispatchTime,numOfHrsTCO,pctOfCallsUnder,TrainHoursEmpl,numOfSpecProg,pctOfBudgetUsed,numOfBudgetAdju,TtlNumOfCalls,TtlNumOfCallsPharr,TtlNumTrans,TtlNumILA,CompletionRate,pctCriteria,pctStaffCert,pctCertObtained) VALUES ('${avgDispatchTime}','${numOfHrsTCO}','${pctOfCallsUnder}','${trainHoursEmpl}','${numOfSpecProg}','${pctOfBudgetUsed}','${numOfBudgetAdju}','${ttlNumOfCalls}','${ttlNumOfCallsPharr}','${ttlNumTrans}','${ttlNumILA}','${completionRate}','${pctCriteria}','${pctStaffCert}','${pctCertObtained}')`;
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
          close();
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

/* 
average Dispatch time of emergency services -> avgDispatchTime
number of Hours/TCO -> numOfHrsTCO
percentage of calls answered within 15mins -> pctOfCallsUnder

training hours/employee (annual) -> TrainHoursEmpl
number of specialized programs -> numOfSpecProg
percentage of budget used -> pctOfBudgetUsed
number of budget adjustments -> numOfBudgetAdju

total number of calls -> TtlNumOfCalls
total number of calls in pharr -> TtlNumOfCallsPharr
total number -> TtlNumTrans
total number -> TtlNumILA

Completion Rate -> CompletionRate
percentage criteria -> pctCriteria
percentage staff certified -> pctStaffCert

percentage certifiations obtained -> pctCertObtained
*/
/*
uuid:
urlCode:
date = 
 avgDispatchTime = `${avgDispatchTime}` 
 numOfHrsTCO = `${numOfHrsTCO}` 
 pctOfCallsUnder = `${pctOfCallsUnder}` 
 trainHoursEmpl = `${trainHoursEmpl}` 
 numOfSpecProg = `${numOfSpecProg}` 
 pctOfBudgetUsed = `${pctOfBudgetUsed}` 
 numOfBudgetAdju = `${numOfBudgetAdju}` 
 TtlNumOfCalls = `${TtlNumOfCalls}` 
 TtlNumOfCallsPharr = `${TtlNumOfCallsPharr}` 
 TtlNumTrans = `${TtlNumTrans}` 
 TtlNumILA = `${TtlNumILA}` 
 CompletionRate = `${CompletionRate}` 
 pctCriteria = `${pctCriteria}` 
 pctStaffCert = `${pctStaffCert}` 
 pctCertObtained = `${pctCertObtained}` 

*/
