import axios, { AxiosError } from "axios";
import { BASE_URL, DEFAULT_HEADERS, TOKEN } from "./const";

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

baseApi.interceptors.request.use(
  async (config) => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
      config.headers.Accept = "'application/json'"
    }

    return config;
  },
  (error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
