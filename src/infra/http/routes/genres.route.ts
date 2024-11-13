import { Router } from "express";
import { GenresFactory } from "../../../domain/factories/genres.factory";

const genresRouter = Router();

genresRouter.get("/movie", (req, res) => {
  GenresFactory.makeGenresController().then((genresController) => {
    genresController.getMoviesGenres(req, res);
  });
});

genresRouter.get("/serie", (req, res) => {
  GenresFactory.makeGenresController().then((genresController) => {
    genresController.getSeriesGenres(req, res);
  });
});

export { genresRouter };
