import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

// API
import {
  fetchMovies,
  fetchSessionById,
  fetchSessionsByDateForMovie,
  fetchSessionsDatesByMovieId,
  postBookingData,
} from "../api/cinemaApi";

// Actions
import {
  initializeMovies,
  loadMovieSessionsDates,
  loadSelectedSessions,
  loadSelectedSessionTime,
  sendBookingData,
  setErrorMessage,
  setMovies,
  setMovieSessionsDates,
  setPaymentStatus,
  setSelectedSessions,
  setSelectedSessionTime,
} from "./cinemaSlice";

// Types
import type {
  BookingData,
  SavedBookingData,
} from "../interfaces/booking.interface";
import type { Movie } from "../interfaces/movies.interface";
import type {
  DetailedSession,
  Session,
} from "../interfaces/sessions.interface";

// cinema/initializeMovies saga
export function* initializeMoviesSaga() {
  try {
    const response: Movie[] = yield call(fetchMovies);

    yield put(setMovies(response));
  } catch (error) {
    console.error("Error loading movies:", error);
    yield put(
      setErrorMessage("Failed to load movies. Please try again later."),
    );
  }
}

// cinema/loadMovieSessionsDates saga
export function* loadMovieSessionsDatesSaga(action: PayloadAction<string>) {
  try {
    if (!action.payload) {
      throw new Error("Movie ID is required to load sessions.");
    }

    const response: string[] = yield call(
      fetchSessionsDatesByMovieId,
      action.payload,
    );

    yield put(setMovieSessionsDates(response));
  } catch (error) {
    yield put(
      setErrorMessage("Failed to load sessions list. Please try again later."),
    );
    console.error("Error loading sessions list:", error);
  }
}

// cinema/loadSelectedSessions saga
export function* loadSelectedSessionsSaga(
  action: PayloadAction<{ movieId: string; date: string }>,
) {
  try {
    if (!action.payload) {
      throw new Error(
        "Movie ID and date are required to load session details.",
      );
    }

    const { movieId, date } = action.payload;

    const response: Session[] = yield call(
      fetchSessionsByDateForMovie,
      movieId,
      date,
    );

    yield put(setSelectedSessions(response));
  } catch (error) {
    yield put(
      setErrorMessage("Failed to load sessions. Please try again later."),
    );
    console.error("Error loading sessions:", error);
  }
}

// cinema/loadSelectedSessionTime saga
export function* loadSelectedSessionTimeSaga(action: PayloadAction<string>) {
  try {
    if (!action.payload) {
      throw new Error("Session ID is required to load session.");
    }

    const sessionId = action.payload;

    const response: DetailedSession = yield call(fetchSessionById, sessionId);

    yield put(setSelectedSessionTime(response));
  } catch (error) {
    yield put(
      setErrorMessage("Failed to load session. Please try again later."),
    );
    console.error("Error loading session:", error);
  }
}

// cinema/sendBookingData saga
export function* sendBookingDataSaga(action: PayloadAction<BookingData>) {
  try {
    if (!action.payload) {
      throw new Error("Booking data is required to send booking.");
    }

    yield put(setPaymentStatus("processing"));

    const bookingData = action.payload;

    const response: SavedBookingData = yield call(postBookingData, bookingData);

    if (!response || !response._id) {
      yield put(setPaymentStatus("failed"));
      throw new Error("Booking failed. Please try again.");
    }

    yield put(setPaymentStatus("successful"));
  } catch (error) {
    yield put(setPaymentStatus("failed"));
    yield put(
      setErrorMessage("Failed to send booking data. Please try again later."),
    );
    console.error("Error sending booking data:", error);
  }
}

// cinema saga to handle side effects
export function* cinemaSaga() {
  yield takeLatest(initializeMovies.type, initializeMoviesSaga);
  yield takeLatest(loadMovieSessionsDates.type, loadMovieSessionsDatesSaga);
  yield takeLatest(loadSelectedSessions.type, loadSelectedSessionsSaga);
  yield takeLatest(loadSelectedSessionTime.type, loadSelectedSessionTimeSaga);
  yield takeLatest(sendBookingData.type, sendBookingDataSaga);
}
