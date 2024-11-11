import { Request, Response } from "express";
import { MoviesFactory } from "../../../domain/factories/movies.factory";

export class MoviesController {
  constructor(private moviesFactory: MoviesFactory) {}

  async getMovieById(req: Request, res: Response) {
    const { id } = req.params;

    const getMovieByIdUseCase =
      await this.moviesFactory.makeGeyMovieByIdUseCase();
    const movie = await getMovieByIdUseCase.execute(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  }

  async getPopularMovies(_: Request, res: Response) {
    const getPopularMoviesUseCase =
      await this.moviesFactory.makeGetPopularMoviesUseCase();
    const movies = await getPopularMoviesUseCase.execute();

    return res.status(200).json(movies);
  }
}
