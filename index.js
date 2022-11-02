const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const kpiGET = require("./Routes/kpiGET");
const kpiPOST = require("./Routes/kpiPOST");
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/", kpiGET);
app.use("/", kpiPOST);
// Port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
// GET Request
app.get("/", (req, res) => {
  try {
    console.log(`SERVER STARTED UP`);
    res.status(200).send(`Hello World from the comms server.`);
  } catch (err) {
    console.log(`SERVER IS UNABLE TO START UP.`);
    res.status(500).send(err);
  }
});
// Port Lister

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT${port}`);
});
