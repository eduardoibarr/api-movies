import { Router } from "express";

import { MoviesController } from "../controllers/movies.controller";
import { MoviesFactory } from "../../../domain/factories/movies.factory";

const moviesRouter = Router();

const moviesFactory = new MoviesFactory();
const moviesController = new MoviesController(moviesFactory);

moviesRouter.get("/:id", async (req, res, next) => {
  try {
    await moviesController.getMovieById(req, res);
  } catch (err) {
    next(err);
  }
});

moviesRouter.get("/popular", async (req, res, next) => {
  try {
    await moviesController.getPopularMovies(req, res);
  } catch (err) {
    next(err);
  }
});

export { moviesRouter };
