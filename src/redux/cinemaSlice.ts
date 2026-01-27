import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../interfaces/movies.interface";
import type {
  Session,
  DetailedSession,
} from "../interfaces/sessions.interface";
import type {
  BookingData,
  BookingSummary,
  PaymentStatus,
} from "../interfaces/booking.interface";

interface CinemaState {
  movies: Movie[];
  sessionsDates: string[];
  selectedDate: string;
  selectedSessions: Session[] | null;
  selectedSessionTimeId?: string;
  selectedSessionTime: DetailedSession | null;
  bookingSummary: BookingSummary | null;
  bookingData: BookingData | null;
  paymentStatus: PaymentStatus;
  errorMessage: string | null;
}

const initialState: CinemaState = {
  movies: [],
  sessionsDates: [],
  selectedDate: "",
  selectedSessions: null,
  selectedSessionTime: null,
  bookingSummary: null,
  bookingData: null,
  paymentStatus: "idle",
  errorMessage: null,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    initializeMovies: () => {
      // This action handled by saga to fetch movies
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    loadMovieSessionsDates: (_state, _action: PayloadAction<string>) => {
      // This action handled by saga to load sessions for movies
    },
    setMovieSessionsDates: (state, action: PayloadAction<string[]>) => {
      state.sessionsDates = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    loadSelectedSessions: (
      _state,
      _action: PayloadAction<{ movieId: string; date: string }>,
    ) => {
      // This action handled by saga to load selected session details
    },
    setSelectedSessions: (state, action: PayloadAction<Session[]>) => {
      state.selectedSessions = action.payload;
    },
    setSelectedSessionTimeId: (state, action: PayloadAction<string>) => {
      state.selectedSessionTimeId = action.payload;
    },
    loadSelectedSessionTime: (_state, _action: PayloadAction<string>) => {
      // This action handled by saga to load selected session time details
    },
    setSelectedSessionTime: (
      state,
      action: PayloadAction<DetailedSession | null>,
    ) => {
      state.selectedSessionTime = action.payload;
    },
    setBookingSummary: (
      state,
      action: PayloadAction<BookingSummary | null>,
    ) => {
      state.bookingSummary = action.payload;
    },
    setBookingData: (state, action: PayloadAction<BookingData | null>) => {
      state.bookingData = action.payload;
    },
    sendBookingData: (_state, _action: PayloadAction<BookingData>) => {
      // This action handled by saga to send booking data to API
    },
    setPaymentStatus: (state, action: PayloadAction<PaymentStatus>) => {
      state.paymentStatus = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    resetPaymentState: (state) => {
      state.bookingData = null;
      state.bookingSummary = null;
      state.paymentStatus = "idle";
      state.errorMessage = null;
    },
  },
});

export const {
  initializeMovies,
  setMovies,
  loadMovieSessionsDates,
  setMovieSessionsDates,
  setSelectedDate,
  loadSelectedSessions,
  setSelectedSessions,
  setSelectedSessionTimeId,
  loadSelectedSessionTime,
  setSelectedSessionTime,
  setBookingSummary,
  setBookingData,
  sendBookingData,
  setPaymentStatus,
  setErrorMessage,
  resetPaymentState,
} = cinemaSlice.actions;
export default cinemaSlice.reducer;
