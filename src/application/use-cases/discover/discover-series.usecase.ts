import { SerieDiscoveryFilterParams } from "../../../domain/models/discover";
import { Pagination } from "../../../domain/models/pagination";
import { Serie } from "../../../domain/models/serie";
import { DiscoverService } from "../../services/discover.service";

export class DiscoverSeriesUseCase {
  constructor(private readonly discoverService: DiscoverService) {}

  async execute(
    params: SerieDiscoveryFilterParams
  ): Promise<Pagination<Serie>> {
    return this.discoverService.discoverSeries(params);
  }
}
