import { Movie, MovieParams } from "../../domain/models/movie";
import { Pagination } from "../../domain/models/pagination";
import { MoviesService } from "../services/movies.service";

export class GetPopularMoviesUseCase {
  constructor(private moviesService: MoviesService) {}

  async execute(params?: MovieParams): Promise<Pagination<Movie[]>> {
    return this.moviesService.getPopularMovies(params);
  }
}
