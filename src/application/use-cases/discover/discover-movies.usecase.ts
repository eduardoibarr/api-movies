import { MovieDiscoveryFilterParams } from "../../../domain/models/discover";
import { Movie } from "../../../domain/models/movie";
import { Pagination } from "../../../domain/models/pagination";
import { DiscoverService } from "../../services/discover.service";

export class DiscoverMoviesUseCase {
  constructor(private readonly discoverService: DiscoverService) {}

  async execute(
    params: MovieDiscoveryFilterParams
  ): Promise<Pagination<Movie>> {
    return this.discoverService.discoverMovies(params);
  }
}
