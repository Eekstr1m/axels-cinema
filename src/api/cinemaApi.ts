import axios, { type AxiosResponse } from "axios";

// Interceptors
import { authInterceptor } from "./api-interceptor";

// Interfaces
import type { RefreshTokenResponse } from "../interfaces/auth.interface";
import type {
  BookingData,
  SavedBookingData,
} from "../interfaces/booking.interface";
import type { Movie } from "../interfaces/movies.interface";
import type {
  DetailedSession,
  Session,
} from "../interfaces/sessions.interface";
import type { DetailedUser } from "../interfaces/user.interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

authInterceptor(instance);

export const login = async (email: string, password: string) => {
  const response: AxiosResponse<RefreshTokenResponse> = await instance.post(
    "/auth/login",
    { email, password },
  );

  return response.data;
};

export const logout = async () => {
  const response: AxiosResponse<{ message: string }> =
    await instance.post("/auth/logout");

  return response.data;
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
  phone: string,
) => {
  const response: AxiosResponse<RefreshTokenResponse> = await instance.post(
    "/auth/register",
    {
      email,
      password,
      fullName,
      phone,
    },
  );

  return response.data;
};

export const refetchToken = async () => {
  const response: AxiosResponse<RefreshTokenResponse> =
    await instance.post("/auth/refresh");

  return response.data;
};

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

export const fetchUserData = async () => {
  const response: AxiosResponse<DetailedUser> =
    await instance.get("/users/auth-user");

  return response.data;
};
