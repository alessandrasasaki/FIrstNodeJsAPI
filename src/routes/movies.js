const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController");

router.get("/", controller.getAllMovies);

router.post("/", controller.createMovie);

module.exports = router;
