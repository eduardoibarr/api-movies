import { Request, Response } from "express";
import { Logger } from "../../../application/config/logger";
import { GetPopularSeriesUseCase } from "../../../application/use-cases/series/get-popular-series.usecase";
import { GetSerieByIdUseCase } from "../../../application/use-cases/series/get-serie-by-id.usecase";
import { SearchSerieUseCase } from "../../../application/use-cases/series/search-serie.usecase";

export class SeriesController {
  constructor(
    private getSerieByIdUseCase: GetSerieByIdUseCase,
    private getPopularSeriesUseCase: GetPopularSeriesUseCase,
    private searchSerieUseCase: SearchSerieUseCase,
    private logger: Logger
  ) {}

  async getSerieById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const serie = await this.getSerieByIdUseCase.execute(id);

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
      const series = await this.getPopularSeriesUseCase.execute({
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
      const serie = await this.searchSerieUseCase.execute({
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
