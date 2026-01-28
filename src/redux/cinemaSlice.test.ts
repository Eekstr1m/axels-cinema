import cinemaReducer, {
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
} from "./cinemaSlice";

import type { Movie } from "../interfaces/movies.interface";
import type {
  Session,
  DetailedSession,
} from "../interfaces/sessions.interface";
import type {
  BookingSummary,
  BookingData,
} from "../interfaces/booking.interface";

const mockMovie: Movie = {
  _id: "1",
  title: "Test Movie",
  description: "Test Description",
  posterUrl: "https://example.com/poster.jpg",
  duration: 120,
  genres: ["Action"],
  releaseDate: new Date("2025-12-25"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSessions: Session[] = [
  {
    _id: "session-1",
    movieId: "movie-1",
    date: "2026-01-10",
    startTime: "14:00",
  },
  {
    _id: "session-2",
    movieId: "movie-1",
    date: "2026-01-10",
    startTime: "18:00",
  },
];

const mockDetailedSession: DetailedSession = {
  _id: "session-1",
  date: "2026-01-10",
  startTime: "12:00",
  movieId: {
    _id: "movie-1",
    title: "Test Movie",
  },
  seats: [
    [
      { row: 1, number: 1, isBooked: false },
      { row: 1, number: 2, isBooked: false },
      { row: 1, number: 3, isBooked: true },
      { row: 1, number: 4, isBooked: false },
    ],
    [
      { row: 2, number: 1, isBooked: false },
      { row: 2, number: 2, isBooked: true },
      { row: 2, number: 3, isBooked: false },
      { row: 2, number: 4, isBooked: false },
    ],
  ],
  price: 10,
};

const initialState = {
  movies: [],
  sessionsDates: [],
  selectedDate: "",
  selectedSessions: null,
  selectedSessionTimeId: undefined,
  selectedSessionTime: null,
  bookingSummary: null,
  bookingData: null,
  paymentStatus: "idle" as const,
  errorMessage: null,
};

const mockBookingData: BookingData = {
  sessionId: "session-1",
  movieId: "movie-1",
  date: "2026-01-10",
  time: "14:00",
  bookedSeats: [
    { row: 1, number: 1 },
    { row: 1, number: 2 },
  ],
  pricePerSeat: 10,
  totalPrice: 20,
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
};

const mockBookingSummary: BookingSummary = {
  sessionId: "session-1",
  movieId: "movie-1",
  movieTitle: "Test Movie",
  date: "2026-01-10",
  time: "14:00",
  bookedSeats: [
    { row: 1, number: 1 },
    { row: 1, number: 2 },
  ],
  pricePerSeat: 10,
  totalPrice: 20,
};

describe("cinemaSlice", () => {
  test("should return the initial state", () => {
    expect(cinemaReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("initializeMovies action is handled by saga", () => {
    const state = cinemaReducer(initialState, initializeMovies());
    expect(state).toEqual(initialState);
  });

  test("setMovies sets movies in state", () => {
    const movies = [mockMovie];
    const state = cinemaReducer(initialState, setMovies(movies));

    expect(state.movies).toEqual(movies);
  });

  test("loadMovieSessionsDates action is handled by saga", () => {
    const state = cinemaReducer(
      initialState,
      loadMovieSessionsDates("movie-1"),
    );

    expect(state).toEqual(initialState);
  });

  test("setMovieSessionsDates sets sessionsDates in state", () => {
    const dates = ["2026-01-10", "2026-01-11", "2026-01-12"];
    const state = cinemaReducer(initialState, setMovieSessionsDates(dates));

    expect(state.sessionsDates).toEqual(dates);
  });

  test("setSelectedDate sets the selected date", () => {
    const state = cinemaReducer(initialState, setSelectedDate("2026-01-10"));
    expect(state.selectedDate).toBe("2026-01-10");
  });

  test("loadSelectedSessions action is handled by saga", () => {
    const state = cinemaReducer(
      initialState,
      loadSelectedSessions({ movieId: "movie-1", date: "2026-01-10" }),
    );

    expect(state).toEqual(initialState);
  });

  test("setSelectedSessions sets selected sessions in state", () => {
    const state = cinemaReducer(
      initialState,
      setSelectedSessions(mockSessions),
    );

    expect(state.selectedSessions).toEqual(mockSessions);
  });

  test("setSelectedSessionTimeId sets selected session time id", () => {
    const state = cinemaReducer(
      initialState,
      setSelectedSessionTimeId("session-1"),
    );

    expect(state.selectedSessionTimeId).toBe("session-1");
  });

  test("loadSelectedSessionTime action is handled by saga", () => {
    const state = cinemaReducer(
      initialState,
      loadSelectedSessionTime("session-1"),
    );

    expect(state).toEqual(initialState);
  });

  test("setSelectedSessionTime sets selected session time details", () => {
    const state = cinemaReducer(
      initialState,
      setSelectedSessionTime(mockDetailedSession),
    );

    expect(state.selectedSessionTime).toEqual(mockDetailedSession);
  });

  test("setSelectedSessionTime can set to null", () => {
    const previousState = {
      ...initialState,
      selectedSessionTime: mockDetailedSession,
    };

    const state = cinemaReducer(previousState, setSelectedSessionTime(null));
    expect(state.selectedSessionTime).toBeNull();
  });

  test("setBookingSummary sets booking summary", () => {
    const state = cinemaReducer(
      initialState,
      setBookingSummary(mockBookingSummary),
    );
    expect(state.bookingSummary).toEqual(mockBookingSummary);
  });

  test("setBookingSummary can set to null", () => {
    const previousState = {
      ...initialState,
      bookingSummary: mockBookingSummary,
    };

    const state = cinemaReducer(previousState, setBookingSummary(null));
    expect(state.bookingSummary).toBeNull();
  });

  test("setBookingData sets booking data", () => {
    const state = cinemaReducer(initialState, setBookingData(mockBookingData));
    expect(state.bookingData).toEqual(mockBookingData);
  });

  test("setBookingData can set to null", () => {
    const previousState = {
      ...initialState,
      bookingData: mockBookingData,
    };

    const state = cinemaReducer(previousState, setBookingData(null));
    expect(state.bookingData).toBeNull();
  });

  test("sendBookingData action is handled by saga", () => {
    const state = cinemaReducer(initialState, sendBookingData(mockBookingData));
    expect(state).toEqual(initialState);
  });

  test("setPaymentStatus sets payment status", () => {
    const state = cinemaReducer(initialState, setPaymentStatus("processing"));
    expect(state.paymentStatus).toBe("processing");
  });

  test("setPaymentStatus can set to successful", () => {
    const previousState = {
      ...initialState,
      paymentStatus: "processing" as const,
    };

    const state = cinemaReducer(previousState, setPaymentStatus("successful"));
    expect(state.paymentStatus).toBe("successful");
  });

  test("setPaymentStatus can set to failed", () => {
    const previousState = {
      ...initialState,
      paymentStatus: "processing" as const,
    };

    const state = cinemaReducer(previousState, setPaymentStatus("failed"));
    expect(state.paymentStatus).toBe("failed");
  });

  test("setErrorMessage sets error message", () => {
    const errorMessage = "Failed to load movies";

    const state = cinemaReducer(initialState, setErrorMessage(errorMessage));
    expect(state.errorMessage).toBe(errorMessage);
  });

  test("setErrorMessage can clear error message", () => {
    const previousState = {
      ...initialState,
      errorMessage: "Some error",
    };

    const state = cinemaReducer(previousState, setErrorMessage(null));
    expect(state.errorMessage).toBeNull();
  });

  test("resetPaymentState clears payment and booking data", () => {
    const previousState = {
      ...initialState,
      bookingSummary: mockBookingSummary,
      bookingData: mockBookingData,
      paymentStatus: "successful" as const,
      errorMessage: "Some error",
    };

    const state = cinemaReducer(previousState, resetPaymentState());
    expect(state.bookingData).toBeNull();
    expect(state.bookingSummary).toBeNull();
    expect(state.paymentStatus).toBe("idle");
    expect(state.errorMessage).toBeNull();
  });
});
