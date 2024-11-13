import { Genre } from "../../../domain/models/genre";
import { GenresService } from "../../services/genres.service";

export class GetMoviesGenresUseCase {
  constructor(private readonly genresService: GenresService) {}

  async execute(): Promise<Genre[]> {
    const response = await this.genresService.getMoviesGenres();
    return response.genres;
  }
}
