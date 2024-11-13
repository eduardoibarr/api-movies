import axios from "axios";
import { Movie, MovieParams } from "../../domain/models/movie";
import { environment } from "../config/environment";
import { Logger } from "../config/logger";
import {
  MovieDiscoveryFilterParams,
  SerieDiscoveryFilterParams,
} from "../../domain/models/discover";
import { Pagination } from "../../domain/models/pagination";
import { Serie } from "../../domain/models/serie";

export class DiscoverService {
  constructor(private readonly logger: Logger) {}

  private mountHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${environment.MOVIES_API_TOKEN}`,
    };
  }

  private buildUrl(endpoint: string, params?: MovieParams): string {
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

  async discoverMovies(
    params: MovieDiscoveryFilterParams
  ): Promise<Pagination<Movie>> {
    try {
      const response = await axios.get<Pagination<Movie>>(
        this.buildUrl("discover/movie", params),
        {
          headers: this.mountHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on discover movies: ${error}`);
      throw error;
    }
  }

  async discoverSeries(
    params: SerieDiscoveryFilterParams
  ): Promise<Pagination<Serie>> {
    try {
      const response = await axios.get<Pagination<Serie>>(
        this.buildUrl("discover/tv", params),
        {
          headers: this.mountHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on discover series: ${error}`);
      throw error;
    }
  }
}
