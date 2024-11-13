import { Request, Response } from "express";
import { MoviesFactory } from "../../../domain/factories/movies.factory";
import { Logger } from "../../../application/config/logger";

export class MoviesController {
  constructor(
    private moviesFactory: MoviesFactory,
    private logger: Logger
  ) {}

  async getMovieById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getMovieByIdUseCase =
        await this.moviesFactory.makeGeyMovieByIdUseCase();
      const movie = await getMovieByIdUseCase.execute(id);

      if (!movie) {
        return res
          .status(404)
          .json({ message: "Movie not found", statusCode: 404 });
      }

      return res.status(200).json(movie);
    } catch (error) {
      this.logger.getLogger().error(`Error fetching movie by ID: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }

  async getPopularMovies(req: Request, res: Response): Promise<Response> {
    try {
      const { page, query, genre, limit } = req.query;
      const getPopularMoviesUseCase =
        await this.moviesFactory.makeGetPopularMoviesUseCase();
      const movies = await getPopularMoviesUseCase.execute({
        page: Number(page),
        query: query as string,
        genre: genre as string,
      });

      if (!movies.results) {
        return res
          .status(404)
          .json({ message: "Movies not found", statusCode: 404 });
      }

      movies.results = limit
        ? movies.results.slice(0, Number(limit))
        : movies.results.slice(0, 12);

      return res.status(200).json({ ...movies });
    } catch (error) {
      this.logger.getLogger().error(`Error fetching popular movies: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }

  async getTopRatedMovies(_: Request, res: Response): Promise<Response> {
    try {
      const getTopRatedMoviesUseCase =
        await this.moviesFactory.makeGetTopRatedMoviesUseCase();
      const movies = await getTopRatedMoviesUseCase.execute();

      return res.status(200).json(movies);
    } catch (error) {
      this.logger
        .getLogger()
        .error(`Error fetching top-rated movies: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }

  async searchMovie(req: Request, res: Response): Promise<Response> {
    try {
      const { query } = req.query;
      const searchMovieUseCase =
        await this.moviesFactory.makeSearchMovieUseCase();
      const movie = await searchMovieUseCase.execute({
        query: query as string,
      });

      if (!movie.results) {
        return res
          .status(404)
          .json({ message: "Movie not found", statusCode: 404 });
      }

      return res.status(200).json({ ...movie });
    } catch (error) {
      this.logger.getLogger().error(`Error searching movie: ${error}`);
      return res
        .status(500)
        .json({ message: "Internal server error", statusCode: 500 });
    }
  }
}
