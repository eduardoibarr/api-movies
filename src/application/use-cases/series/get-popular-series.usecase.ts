import { SerieParams, Serie } from "../../../domain/models/serie";
import { Pagination } from "../../../domain/models/pagination";
import { SeriesService } from "../../services/series.service";

export class GetPopularSeriesUseCase {
  constructor(private seriesService: SeriesService) {}

  async execute(params?: SerieParams): Promise<Pagination<Serie[]>> {
    return this.seriesService.getPopularSeries(params);
  }
}
