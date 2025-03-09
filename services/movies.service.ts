import { baseApi } from "~/connection/api";
import { AxiosError } from "axios";
import { EndpointEnum } from "~/enum/endpoints.enum";
import { MovieDetails } from "~/models/singlleMovie.model";

class MoviesService {
  async getPopularMovies() {
    try {
      const response = await baseApi.get(`${EndpointEnum.popularMovies}`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return Promise.reject(error?.response?.data);
      } else {
        return Promise.reject(error);
      }
    }
  }
  async topRated() {
    try {
      const response = await baseApi.get(`${EndpointEnum.topRated}`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return Promise.reject(error?.response?.data);
      } else {
        return Promise.reject(error);
      }
    }
  }

  async getGenres() {
    try {
      const response = await baseApi.get<{
        genres: { id: number; name: string }[];
      }>(`${EndpointEnum.genres}`);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return Promise.reject(error?.response?.data);
      } else {
        return Promise.reject(error);
      }
    }
  }

  async getMovieDetails(id: string) {
    try {
      const response = await baseApi.get<MovieDetails>(
        `${EndpointEnum.moviedetails}/${id.toString()}`
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return Promise.reject(error?.response?.data);
      } else {
        return Promise.reject(error);
      }
    }
  }
}

export const moviesService = new MoviesService();
