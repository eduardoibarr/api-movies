import { Pagination } from "../../../domain/models/pagination";
import { SearchParams } from "../../../domain/models/params";
import { Serie } from "../../../domain/models/serie";
import { SeriesService } from "../../services/series.service";

export class SearchSerieUseCase {
  constructor(private readonly seriesService: SeriesService) {}

  async execute(params: SearchParams): Promise<Pagination<Serie[]>> {
    return this.seriesService.searchSerie(params);
  }
}
