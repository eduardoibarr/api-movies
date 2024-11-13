import { Logger } from "../../application/config/logger";
import { SeriesService } from "../../application/services/series.service";
import { GetPopularSeriesUseCase } from "../../application/use-cases/series/get-popular-series.usecase";
import { GetSerieByIdUseCase } from "../../application/use-cases/series/get-serie-by-id.usecase";
import { SearchSerieUseCase } from "../../application/use-cases/series/search-serie.usecase";
import { SeriesController } from "../../infra/http/controllers/series.controller";

export class SeriesFactory {
  private static logger = new Logger();
  private static seriesService = new SeriesService(this.logger);

  static async makeGeySerieByIdUseCase(): Promise<GetSerieByIdUseCase> {
    return new GetSerieByIdUseCase(this.seriesService);
  }

  static async makeGetPopularSeriesUseCase(): Promise<GetPopularSeriesUseCase> {
    return new GetPopularSeriesUseCase(this.seriesService);
  }

  static async makeSeriesController(): Promise<SeriesController> {
    const getSerieByIdUseCase = await this.makeGeySerieByIdUseCase();
    const getPopularSeriesUseCase = await this.makeGetPopularSeriesUseCase();
    const searchSerieUseCase = await this.makeSearchSerieUseCase();

    return new SeriesController(
      getSerieByIdUseCase,
      getPopularSeriesUseCase,
      searchSerieUseCase,
      this.logger
    );
  }

  static async makeSearchSerieUseCase(): Promise<SearchSerieUseCase> {
    return new SearchSerieUseCase(this.seriesService);
  }
}
