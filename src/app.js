const express = require("express");
const app = express();
const index = require("./routes/index");
const movies = require("./routes/movies");

app.use(express.json());
app.use("/", index);
app.use("/movies", movies);

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;
