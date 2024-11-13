import { Movie } from "../../../domain/models/movie";
import { Pagination } from "../../../domain/models/pagination";
import { SearchParams } from "../../../domain/models/params";
import { MoviesService } from "../../services/movies.service";

export class SearchMovieUseCase {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(params: SearchParams): Promise<Pagination<Movie[]>> {
    return this.moviesService.searchMovie(params);
  }
}
