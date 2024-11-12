import { Movie } from "../../domain/models/movie";
import { Pagination } from "../../domain/models/pagination";
import { MoviesService } from "../services/movies.service";

export class GetTopRatedMoviesUseCase {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(): Promise<Pagination<Movie[]>> {
    return this.moviesService.getTopRatedMovies();
  }
}
