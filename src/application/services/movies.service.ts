import axios from "axios";
import { environment } from "../config/environment";
import { Logger } from "../config/logger";

export class MoviesService {
  constructor(private readonly logger: Logger) {}

  private mountHeaders() {
    return {
      Authorization: `Bearer ${environment.MOVIES_API_TOKEN}`,
    };
  }

  async getPopularMovies() {
    const response = await axios.get(
      `${environment.MOVIES_API_URL}/movie/popular`,
      {
        headers: this.mountHeaders(),
      }
    );

    if (response.status !== 200) {
      this.logger
        .getLogger()
        .error(`Error on get popular movies: ${response.data}`);
    }

    return response.data;
  }

  async getTopRatedMovies() {
    const response = await axios.get(
      `${environment.MOVIES_API_URL}/movie/top_rated`,
      {
        headers: this.mountHeaders(),
      }
    );

    if (response.status !== 200) {
      this.logger
        .getLogger()
        .error(`Error on get top rated movies: ${response.data}`);
    }

    return response.data;
  }

  async getUpcomingMovies() {
    const response = await axios.get(
      `${environment.MOVIES_API_URL}/movie/upcoming`,
      {
        headers: this.mountHeaders(),
      }
    );

    if (response.status !== 200) {
      this.logger
        .getLogger()
        .error(`Error on get upcoming movies: ${response.data}`);
    }

    return response.data;
  }

  async getMovieById(id: string) {
    const response = await axios.get(
      `${environment.MOVIES_API_URL}/movie/${id}`,
      {
        headers: this.mountHeaders(),
      }
    );

    if (response.status !== 200) {
      this.logger
        .getLogger()
        .error(`Error on get movie by id: ${response.data}`);
    }

    return response.data;
  }
}
