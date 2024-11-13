import { Request, Response } from "express";
import { DiscoverMoviesUseCase } from "../../../application/use-cases/discover/discover-movies.usecase";
import { DiscoverSeriesUseCase } from "../../../application/use-cases/discover/discover-series.usecase";

export class DiscoverController {
  constructor(
    private readonly discoverMoviesUseCase: DiscoverMoviesUseCase,
    private readonly discoverSeriesUseCase: DiscoverSeriesUseCase
  ) {}

  async discoverMovies(req: Request, res: Response): Promise<Response> {
    const {
      primary_release_year,
      with_genres,
      vote_average_gte,
      region,
      sort_by,
      page,
    } = req.query;

    const movies = await this.discoverMoviesUseCase.execute({
      primary_release_year: Number(primary_release_year),
      with_genres: with_genres as string,
      vote_average_gte: Number(vote_average_gte),
      region: region as string,
      sort_by: sort_by as string,
      page: Number(page),
    });

    if (!movies) {
      return res
        .status(404)
        .json({ message: "Movies not found", statusCode: 404 });
    }

    return res.status(200).json({ ...movies });
  }

  async discoverSeries(req: Request, res: Response): Promise<Response> {
    const {
      first_air_date_year,
      with_genres,
      vote_average_gte,
      with_networks,
      with_original_language,
      sort_by,
      page,
    } = req.query;

    const series = await this.discoverSeriesUseCase.execute({
      first_air_date_year: Number(first_air_date_year),
      with_genres: with_genres as string,
      vote_average_gte: Number(vote_average_gte),
      with_networks: Number(with_networks),
      with_original_language: with_original_language as string,
      sort_by: sort_by as string,
      page: Number(page),
    });

    if (!series) {
      return res
        .status(404)
        .json({ message: "Series not found", statusCode: 404 });
    }

    return res.status(200).json({ ...series });
  }
}
