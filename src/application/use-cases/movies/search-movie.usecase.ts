import { SearchMovieParams, Movie } from "../../../domain/models/movie";
import { Pagination } from "../../../domain/models/pagination";
import { MoviesService } from "../../services/movies.service";

export class SearchMovieUseCase {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(params: SearchMovieParams): Promise<Pagination<Movie[]>> {
    return this.moviesService.searchMovie(params);
  }
}
