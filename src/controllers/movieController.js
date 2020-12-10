const movies = require ("../models/movies.json");
const fs = require("fs");

const getAllMovies = (req, res)=> {
  console.log(req.url);
  res.status(200).send(movies);
};

const createMovie = (req, res)=> {
  const {id, name, genre, synopsis, watched} = req.body;
  movies.push({id, name, genre, synopsis, watched});
  fs.writeFile("./src/models/movies.json", JSON.stringify(movies), "utf8", (err)=> {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    console.log("Arquivo atualizado com sucesso!");
    const movieFound = movies.find(movie => movie.id == id);
    res.status(200).send(movieFound);
  })
};

module.exports = {
  getAllMovies,
  createMovie,
};
