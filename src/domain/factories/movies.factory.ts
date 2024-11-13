import { Logger } from "../../application/config/logger";
import { MoviesService } from "../../application/services/movies.service";
import { GetMovieByIdUseCase } from "../../application/use-cases/movies/get-movie-by-id.usecase";
import { GetPopularMoviesUseCase } from "../../application/use-cases/movies/get-popular-movies.usecase";
import { GetTopRatedMoviesUseCase } from "../../application/use-cases/movies/get-top-rated-movies.usecase";
import { SearchMovieUseCase } from "../../application/use-cases/movies/search-movie.usecase";
import { MoviesController } from "../../infra/http/controllers/movies.controller";

export class MoviesFactory {
  private static logger = new Logger();
  private static moviesService = new MoviesService(this.logger);

  static async makeGeyMovieByIdUseCase(): Promise<GetMovieByIdUseCase> {
    return new GetMovieByIdUseCase(this.moviesService);
  }

  static async makeGetPopularMoviesUseCase(): Promise<GetPopularMoviesUseCase> {
    return new GetPopularMoviesUseCase(this.moviesService);
  }

  static async makeGetTopRatedMoviesUseCase(): Promise<GetTopRatedMoviesUseCase> {
    return new GetTopRatedMoviesUseCase(this.moviesService);
  }

  static async makeMoviesController(): Promise<MoviesController> {
    const getMovieByIdUseCase = await this.makeGeyMovieByIdUseCase();
    const getPopularMoviesUseCase = await this.makeGetPopularMoviesUseCase();
    const getTopRatedMoviesUseCase = await this.makeGetTopRatedMoviesUseCase();
    const searchMovieUseCase = await this.makeSearchMovieUseCase();

    return new MoviesController(
      getMovieByIdUseCase,
      getPopularMoviesUseCase,
      getTopRatedMoviesUseCase,
      searchMovieUseCase,
      this.logger
    );
  }

  static async makeSearchMovieUseCase(): Promise<SearchMovieUseCase> {
    return new SearchMovieUseCase(this.moviesService);
  }
}
