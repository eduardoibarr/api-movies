import { Router } from "express";
import { SeriesFactory } from "../../../domain/factories/series.factory";

const seriesRouter = Router();

seriesRouter.get("/popular", (req, res) => {
  SeriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.getPopularSeries(req, res);
  });
});

seriesRouter.get("/search", (req, res) => {
  SeriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.searchSerie(req, res);
  });
});

seriesRouter.get("/:id", (req, res) => {
  SeriesFactory.makeSeriesController().then((seriesController) => {
    seriesController.getSerieById(req, res);
  });
});

export { seriesRouter };
