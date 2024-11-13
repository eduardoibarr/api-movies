import axios from "axios";
import { environment } from "../config/environment";
import { Logger } from "../config/logger";
import { Movie, MovieParams } from "../../domain/models/movie";
import { Pagination } from "../../domain/models/pagination";
import { SearchParams } from "../../domain/models/params";

export class MoviesService {
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

  async getPopularMovies(params?: MovieParams): Promise<Pagination<Movie[]>> {
    try {
      const response = await axios.get<Pagination<Movie[]>>(
        this.buildUrl("movie/popular", {
          ...params,
          language: "pt-BR",
        }),
        {
          headers: this.mountHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get popular movies: ${error}`);
      throw error;
    }
  }

  async getTopRatedMovies(params?: MovieParams): Promise<Pagination<Movie[]>> {
    try {
      const response = await axios.get<Pagination<Movie[]>>(
        this.buildUrl("movie/top_rated", {
          ...params,
          language: "pt-BR",
        }),
        {
          headers: this.mountHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get top-rated movies: ${error}`);
      throw error;
    }
  }

  async getUpcomingMovies(params?: MovieParams): Promise<Pagination<Movie[]>> {
    try {
      const response = await axios.get<Pagination<Movie[]>>(
        this.buildUrl("movie/upcoming", {
          ...params,
          language: "pt-BR",
        }),
        {
          headers: this.mountHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get upcoming movies: ${error}`);
      throw error;
    }
  }

  async getMovieById(id: string): Promise<Pagination<Movie[]>> {
    try {
      const response = await axios.get<Pagination<Movie[]>>(
        `${environment.MOVIES_API_URL}/movie/${id}`,
        {
          headers: this.mountHeaders(),
          params: {
            language: "pt-BR",
          },
        }
      );
      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on get movie by id: ${error}`);
      throw error;
    }
  }

  async searchMovie(params: SearchParams): Promise<Pagination<Movie[]>> {
    try {
      const response = await axios.get<Pagination<Movie[]>>(
        this.buildUrl("search/movie", params),
        {
          headers: this.mountHeaders(),
          params: {
            language: "pt-BR",
          },
        }
      );

      return response.data;
    } catch (error) {
      this.logger.getLogger().error(`Error on search movie: ${error}`);
      throw error;
    }
  }
}
