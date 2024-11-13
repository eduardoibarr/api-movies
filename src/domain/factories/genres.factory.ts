import { Logger } from "../../application/config/logger";
import { GenresService } from "../../application/services/genres.service";
import { GetMoviesGenresUseCase } from "../../application/use-cases/genres/get-movies-genres.usecase";
import { GetSeriesGenresUseCase } from "../../application/use-cases/genres/get-series-genres.usecase";
import { GenresController } from "../../infra/http/controllers/genres.controller";

export class GenresFactory {
  private static logger = new Logger();
  private static genresService = new GenresService(this.logger);

  static async makeGetMoviesGenresUseCase(): Promise<GetMoviesGenresUseCase> {
    return new GetMoviesGenresUseCase(this.genresService);
  }

  static async makeGetSeriesGenresUseCase(): Promise<GetSeriesGenresUseCase> {
    return new GetSeriesGenresUseCase(this.genresService);
  }

  static async makeGenresController(): Promise<GenresController> {
    const getMoviesGenresUseCase = await this.makeGetMoviesGenresUseCase();
    const getSeriesGenresUseCase = await this.makeGetSeriesGenresUseCase();

    return new GenresController(getMoviesGenresUseCase, getSeriesGenresUseCase);
  }
}
