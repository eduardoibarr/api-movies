import { MoviesService } from "../services/movies.service";

export class GetPopularMoviesUseCase {
  constructor(private moviesService: MoviesService) {}

  async execute() {
    return this.moviesService.getPopularMovies();
  }
}
