import { Router } from "express";
import { SeriesFactory } from "../../../domain/factories/series.factory";

const seriesRouter = Router();
const seriesFactory = new SeriesFactory();

seriesRouter.get("/popular", (req, res) => {
  seriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.getPopularSeries(req, res);
  });
});

seriesRouter.get("/search", (req, res) => {
  seriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.searchSerie(req, res);
  });
});

seriesRouter.get("/:id", (req, res) => {
  seriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.getSerieById(req, res);
  });
});

export { seriesRouter };
