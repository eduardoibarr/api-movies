import axios from "axios";
import { environment } from "../config/environment";
import { Logger } from "../config/logger";
import { Pagination } from "../../domain/models/pagination";
import { Serie, SerieParams } from "../../domain/models/serie";
import { SearchParams } from "../../domain/models/params";

export class SeriesService {
  constructor(private readonly logger: Logger) {}

  private mountHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${environment.MOVIES_API_TOKEN}`,
    };
  }

  private buildUrl(endpoint: string, params?: SerieParams): string {
    const url = new URL(`${environment.MOVIES_API_URL}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value.toString());
        }
      });
    }
    return url.toString();
  }

  async getPopularSeries(params?: SerieParams): Promise<Pagination<Serie[]>> {
    try {
      const response = await axios.get<Pagination<Serie[]>>(
        this.buildUrl("tv/popular", {
          ...params,
          language: "pt-BR",
        }),
        {
          headers: this.mountHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get popular series: ${error}`);
      throw error;
    }
  }

  async getSerieById(id: string): Promise<Pagination<Serie[]>> {
    try {
      const response = await axios.get<Pagination<Serie[]>>(
        `${environment.MOVIES_API_URL}/tv/${id}`,
        {
          headers: this.mountHeaders(),
          params: {
            language: "pt-BR",
          },
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get serie by id: ${error}`);
      throw error;
    }
  }

  async searchSerie(params: SearchParams): Promise<Pagination<Serie[]>> {
    try {
      const response = await axios.get<Pagination<Serie[]>>(
        this.buildUrl("search/tv", params),
        {
          headers: this.mountHeaders(),
          params: {
            language: "pt-BR",
          },
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on search serie: ${error}`);
      throw error;
    }
  }
}
