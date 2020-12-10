const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController");

router.get("/", controller.getAllMovies);

router.post("/", controller.createMovie);

router.get("/:id", controller.getMovie);

router.put("/:id", controller.updateMovie);

module.exports = router;
