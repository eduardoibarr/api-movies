import { Logger } from "../../application/config/logger";
import { MoviesService } from "../../application/services/movies.service";
import { GetMovieByIdUseCase } from "../../application/use-cases/get-movie-by-id.usecase";
import { GetPopularMoviesUseCase } from "../../application/use-cases/get-popular-movies.usecase";

export class MoviesFactory {
  async makeGeyMovieByIdUseCase() {
    const logger = new Logger();
    const moviesService = new MoviesService(logger);
    return new GetMovieByIdUseCase(moviesService);
  }

  async makeGetPopularMoviesUseCase() {
    const logger = new Logger();
    const moviesService = new MoviesService(logger);
    return new GetPopularMoviesUseCase(moviesService);
  }
}
