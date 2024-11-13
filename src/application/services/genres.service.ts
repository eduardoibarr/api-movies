import axios from "axios";
import { GenreResponse } from "../../domain/models/genre";
import { MovieParams } from "../../domain/models/movie";
import { environment } from "../config/environment";
import { Logger } from "../config/logger";

export class GenresService {
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

  async getMoviesGenres(): Promise<GenreResponse> {
    try {
      const response = await axios.get<GenreResponse>(
        this.buildUrl("genre/movie/list"),
        {
          headers: this.mountHeaders(),
          params: { language: "pt-BR" },
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get movies genres: ${error}`);
      throw error;
    }
  }

  async getSeriesGenres(): Promise<GenreResponse> {
    try {
      const response = await axios.get<GenreResponse>(
        this.buildUrl("genre/tv/list"),
        {
          headers: this.mountHeaders(),
          params: { language: "pt-BR" },
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get tv genres: ${error}`);
      throw error;
    }
  }
}
