import { Router } from "express";
import { MoviesFactory } from "../../../domain/factories/movies.factory";

const moviesRouter = Router();

moviesRouter.get("/popular", (req, res) => {
  MoviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getPopularMovies(req, res);
  });
});

moviesRouter.get("/top-rated", (req, res) => {
  MoviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getTopRatedMovies(req, res);
  });
});

moviesRouter.get("/search", (req, res) => {
  MoviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.searchMovie(req, res);
  });
});

moviesRouter.get("/:id", (req, res) => {
  MoviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getMovieById(req, res);
  });
});

export { moviesRouter };
