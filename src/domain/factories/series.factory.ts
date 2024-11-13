import { Logger } from "../../application/config/logger";
import { SeriesService } from "../../application/services/series.service";
import { GetPopularSeriesUseCase } from "../../application/use-cases/series/get-popular-series.usecase";
import { GetSerieByIdUseCase } from "../../application/use-cases/series/get-serie-by-id.usecase";
import { SearchSerieUseCase } from "../../application/use-cases/series/search-serie.usecase";
import { SeriesController } from "../../infra/http/controllers/series.controller";

export class SeriesFactory {
  async makeGeySerieByIdUseCase(): Promise<GetSerieByIdUseCase> {
    const logger = new Logger();
    const seriesService = new SeriesService(logger);
    return new GetSerieByIdUseCase(seriesService);
  }

  async makeGetPopularSeriesUseCase(): Promise<GetPopularSeriesUseCase> {
    const logger = new Logger();
    const seriesService = new SeriesService(logger);
    return new GetPopularSeriesUseCase(seriesService);
  }

  async makeSeriesController(): Promise<SeriesController> {
    const logger = new Logger();
    const seriesFactory = new SeriesFactory();
    return new SeriesController(seriesFactory, logger);
  }

  async makeSearchSerieUseCase(): Promise<SearchSerieUseCase> {
    const logger = new Logger();
    const seriesService = new SeriesService(logger);
    return new SearchSerieUseCase(seriesService);
  }
}
