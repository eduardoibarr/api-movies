import { Serie } from "../../../domain/models/serie";
import { Pagination } from "../../../domain/models/pagination";
import { SeriesService } from "../../services/series.service";

export class GetSerieByIdUseCase {
  constructor(private seriesService: SeriesService) {}

  async execute(id: string): Promise<Pagination<Serie[]>> {
    return this.seriesService.getSerieById(id);
  }
}
