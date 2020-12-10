const express = require("express");
const app = express();
const index = require("./routes/index");

app.use(express.json());
app.use("/", index);

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;
