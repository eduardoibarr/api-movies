import { Logger } from "../../application/config/logger";
import { DiscoverService } from "../../application/services/discover.service";
import { DiscoverMoviesUseCase } from "../../application/use-cases/discover/discover-movies.usecase";
import { DiscoverSeriesUseCase } from "../../application/use-cases/discover/discover-series.usecase";
import { DiscoverController } from "../../infra/http/controllers/discover.controller";

export class DiscoverFactory {
  private static logger = new Logger();
  private static discoverService = new DiscoverService(this.logger);

  static async makeDiscoverMoviesUseCase() {
    return new DiscoverMoviesUseCase(this.discoverService);
  }

  static async makeDiscoverSeriesUseCase() {
    return new DiscoverSeriesUseCase(this.discoverService);
  }

  static async makeDiscoverController() {
    const discoverMoviesUseCase = await this.makeDiscoverMoviesUseCase();
    const discoverSeriesUseCase = await this.makeDiscoverSeriesUseCase();

    return new DiscoverController(discoverMoviesUseCase, discoverSeriesUseCase);
  }
}
