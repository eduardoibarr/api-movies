import { Genre } from "../../../domain/models/genre";
import { GenresService } from "../../services/genres.service";

export class GetSeriesGenresUseCase {
  constructor(private readonly genresService: GenresService) {}

  async execute(): Promise<Genre[]> {
    const response = await this.genresService.getSeriesGenres();
    return response.genres;
  }
}
