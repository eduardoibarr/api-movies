import { MoviesService } from "../services/movies.service";

export class GetMovieByIdUseCase {
  constructor(private moviesService: MoviesService) {}

  async execute(id: string) {
    return this.moviesService.getMovieById(id);
  }
}
