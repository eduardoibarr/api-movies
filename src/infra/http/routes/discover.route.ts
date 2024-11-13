import { Router } from "express";
import { DiscoverFactory } from "../../../domain/factories/discover.factory";

const discoverRouter = Router();

discoverRouter.get("/movies", (req, res) => {
  DiscoverFactory.makeDiscoverController().then((genresController) => {
    genresController.discoverMovies(req, res);
  });
});

discoverRouter.get("/series", (req, res) => {
  DiscoverFactory.makeDiscoverController().then((genresController) => {
    genresController.discoverSeries(req, res);
  });
});

export { discoverRouter };
