import { Router } from "express";
import { GenresFactory } from "../../../domain/factories/genres.factory";

const genresRouter = Router();
const genresFactory = new GenresFactory();

genresRouter.get("/movie", (req, res) => {
  genresFactory.makeGenresController().then((genresController) => {
    genresController.getMoviesGenres(req, res);
  });
});

genresRouter.get("/serie", (req, res) => {
  genresFactory.makeGenresController().then((genresController) => {
    genresController.getSeriesGenres(req, res);
  });
});

export { genresRouter };
