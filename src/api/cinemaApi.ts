import axios, { type AxiosResponse } from "axios";

// Other
import type { Movie } from "../interfaces/movies.interface";
import type {
  Session,
  DetailedSession,
} from "../interfaces/sessions.interface";
import type {
  BookingData,
  SavedBookingData,
} from "../interfaces/booking.interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMovies = async () => {
  const response: AxiosResponse<Movie[]> = await instance.get("/movies");

  return response.data;
};

export const fetchSessionsDatesByMovieId = async (movieId: string) => {
  const response: AxiosResponse<string[]> = await instance.get(
    `/sessions/movie/${movieId}/dates`,
  );

  return response.data;
};

export const fetchSessionsByDateForMovie = async (
  movieId: string,
  date: string,
) => {
  const response: AxiosResponse<Session[]> = await instance.get(
    `/sessions/movie/${movieId}/date/${date}`,
  );

  return response.data;
};

export const fetchSessionById = async (sessionId: string) => {
  const response: AxiosResponse<DetailedSession> = await instance.get(
    `/sessions/${sessionId}`,
  );

  return response.data;
};

export const postBookingData = async (bookingData: BookingData) => {
  const response: AxiosResponse<SavedBookingData> = await instance.post(
    "/booking",
    bookingData,
  );

  return response.data;
};
