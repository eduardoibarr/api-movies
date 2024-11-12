import { Movie } from "../../domain/models/movie";
import { Pagination } from "../../domain/models/pagination";
import { MoviesService } from "../services/movies.service";

export class GetMovieByIdUseCase {
  constructor(private moviesService: MoviesService) {}

  async execute(id: string): Promise<Pagination<Movie[]>> {
    return this.moviesService.getMovieById(id);
  }
}
