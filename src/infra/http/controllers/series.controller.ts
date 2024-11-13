import { Request, Response } from "express";
import { Logger } from "../../../application/config/logger";
import { SeriesFactory } from "../../../domain/factories/series.factory";

export class SeriesController {
  constructor(
    private seriesFactory: SeriesFactory,
    private logger: Logger
  ) {}

  async getSerieById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getSerieByIdUseCase =
        await this.seriesFactory.makeGeySerieByIdUseCase();
      const serie = await getSerieByIdUseCase.execute(id);

      if (!serie) {
        return res
          .status(404)
          .json({ message: "Serie not found", statusCode: 404 });
      }

      return res.status(200).json(serie);
    } catch (error) {
      this.logger.getLogger().error(`Error fetching serie by ID: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }

  async getPopularSeries(req: Request, res: Response): Promise<Response> {
    try {
      const { page, query, genre, limit } = req.query;
      const getPopularSeriesUseCase =
        await this.seriesFactory.makeGetPopularSeriesUseCase();
      const series = await getPopularSeriesUseCase.execute({
        page: Number(page),
        query: query as string,
        genre: genre as string,
      });

      if (!series.results) {
        return res
          .status(404)
          .json({ message: "Series not found", statusCode: 404 });
      }

      series.results = limit
        ? series.results.slice(0, Number(limit))
        : series.results.slice(0, 12);

      return res.status(200).json({ ...series });
    } catch (error) {
      this.logger.getLogger().error(`Error fetching popular series: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }

  async searchSerie(req: Request, res: Response): Promise<Response> {
    try {
      const { query } = req.query;
      const searchSerieUseCase =
        await this.seriesFactory.makeSearchSerieUseCase();
      const serie = await searchSerieUseCase.execute({
        query: query as string,
      });

      if (!serie.results) {
        return res
          .status(404)
          .json({ message: "Serie not found", statusCode: 404 });
      }

      return res.status(200).json({ ...serie });
    } catch (error) {
      this.logger.getLogger().error(`Error searching serie: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }
}
