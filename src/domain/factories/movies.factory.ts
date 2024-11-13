import { Logger } from "../../application/config/logger";
import { MoviesService } from "../../application/services/movies.service";
import { GetMovieByIdUseCase } from "../../application/use-cases/movies/get-movie-by-id.usecase";
import { GetPopularMoviesUseCase } from "../../application/use-cases/movies/get-popular-movies.usecase";
import { GetTopRatedMoviesUseCase } from "../../application/use-cases/movies/get-top-rated-movies.usecase";
import { MoviesController } from "../../infra/http/controllers/movies.controller";

export class MoviesFactory {
  async makeGeyMovieByIdUseCase(): Promise<GetMovieByIdUseCase> {
    const logger = new Logger();
    const moviesService = new MoviesService(logger);
    return new GetMovieByIdUseCase(moviesService);
  }

  async makeGetPopularMoviesUseCase(): Promise<GetPopularMoviesUseCase> {
    const logger = new Logger();
    const moviesService = new MoviesService(logger);
    return new GetPopularMoviesUseCase(moviesService);
  }

  async makeGetTopRatedMoviesUseCase(): Promise<GetTopRatedMoviesUseCase> {
    const logger = new Logger();
    const moviesService = new MoviesService(logger);
    return new GetTopRatedMoviesUseCase(moviesService);
  }

  async makeMoviesController(): Promise<MoviesController> {
    const logger = new Logger();
    const moviesFactory = new MoviesFactory();
    return new MoviesController(moviesFactory, logger);
  }
}
