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

const getMovie = (req, res) => {
  const movieId = req.params.id;
  const movieFound = movies.find((movie) => movie.id == movieId);
  if (movieFound) {
    res.status(200).send(movieFound);
    return;
  }
  res.status(404).send({message: "Filme não encontrado"});
}

const updateMovie = (req, res) => {
  try {
    const movieId = req.params.id;
    const movieToUpdate = req.body;
    const movieFound = movies.find(movie => movie.id == movieId);
    const movieIndex = movies.indexOf(movieFound);

    if (movieIndex >= 0) {
      movies.splice(movieIndex, 1, movieToUpdate);
    } else {
      res.status(404).send({message: "Filme não encontrado para ser atualizado!"});
    }

    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), "utf8", (err) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      console.log("Arquivo de filmes atualizado com sucesso!");
      const movieUpdated = movies.find(movie => movie.id == movieId);
      res.status(200).send(movieUpdated);
    });
  } catch(err) {
    res.status(500).send({message: err});
  }
}

const updateWatchedStatus = (req, res) => {
  try {
    const movieId = req.params.id;
    const watched = req.body.watched;
    const movieToUpdate = movies.find(movie => movie.id == movieId);
    const movieIndex = movies.indexOf(movieToUpdate);

    if (movieIndex >= 0) {
      movieToUpdate.watched = watched;
      movies.splice(movieIndex, 1, movieToUpdate);
    } else {
      res.status(404).send({message: "Filme não encontrado"});
    }

    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), "utf8", (err) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      console.log("Arquivo atualizado com sucesso!");
      const movieUpdated = movies.find((movie) => movie.id == movieId);
      res.status(200).send(movieUpdated);
    });
  } catch(err) {
    res.status(500).send({message: err});
  }
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  updateWatchedStatus,
};
