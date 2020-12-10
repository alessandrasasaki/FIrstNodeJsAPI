const movies = require ("../models/movies.json");

const getAllMovies = (req, res)=> {
  console.log(req.url);
  res.status(200).send(movies);
};

module.exports = {
  getAllMovies,
};
