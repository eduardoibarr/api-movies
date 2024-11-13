import { Logger } from "../../application/config/logger";
import { GenresService } from "../../application/services/genres.service";
import { GetMoviesGenresUseCase } from "../../application/use-cases/genres/get-movies-genres.usecase";
import { GetSeriesGenresUseCase } from "../../application/use-cases/genres/get-series-genres.usecase";
import { GenresController } from "../../infra/http/controllers/genres.controller";

export class GenresFactory {
  async makeGetMoviesGenresUseCase(): Promise<GetMoviesGenresUseCase> {
    const logger = new Logger();
    const genresService = new GenresService(logger);
    return new GetMoviesGenresUseCase(genresService);
  }

  async makeGetSeriesGenresUseCase(): Promise<GetSeriesGenresUseCase> {
    const logger = new Logger();
    const genresService = new GenresService(logger);
    return new GetSeriesGenresUseCase(genresService);
  }

  async makeGenresController(): Promise<GenresController> {
    const getMoviesGenresUseCase = await this.makeGetMoviesGenresUseCase();
    const getSeriesGenresUseCase = await this.makeGetSeriesGenresUseCase();

    return new GenresController(getMoviesGenresUseCase, getSeriesGenresUseCase);
  }
}
