import { Router } from "express";
import { MoviesFactory } from "../../../domain/factories/movies.factory";

const moviesRouter = Router();

const moviesFactory = new MoviesFactory();

moviesRouter.get("/popular", (req, res) => {
  moviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getPopularMovies(req, res);
  });
});

moviesRouter.get("/top-rated", (req, res) => {
  moviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getTopRatedMovies(req, res);
  });
});

moviesRouter.get("/search", (req, res) => {
  moviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.searchMovie(req, res);
  });
});

moviesRouter.get("/:id", (req, res) => {
  moviesFactory.makeMoviesController().then((moviesController) => {
    moviesController.getMovieById(req, res);
  });
});

export { moviesRouter };
