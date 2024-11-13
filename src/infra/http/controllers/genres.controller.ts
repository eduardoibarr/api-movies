import { Request, Response } from "express";
import { GetMoviesGenresUseCase } from "../../../application/use-cases/genres/get-movies-genres.usecase";
import { GetSeriesGenresUseCase } from "../../../application/use-cases/genres/get-series-genres.usecase";

export class GenresController {
  constructor(
    private readonly getMoviesGenresUseCase: GetMoviesGenresUseCase,
    private readonly getSeriesGenresUseCase: GetSeriesGenresUseCase
  ) {}

  async getMoviesGenres(_: Request, res: Response): Promise<Response> {
    const genres = await this.getMoviesGenresUseCase.execute();

    if (!genres) {
      return res
        .status(404)
        .json({ message: "Genres not found", statusCode: 404 });
    }

    return res.status(200).json({ ...genres });
  }

  async getSeriesGenres(_: Request, res: Response): Promise<Response> {
    const genres = await this.getSeriesGenresUseCase.execute();

    if (!genres) {
      return res
        .status(404)
        .json({ message: "Genres not found", statusCode: 404 });
    }

    return res.status(200).json({ ...genres });
  }
}
