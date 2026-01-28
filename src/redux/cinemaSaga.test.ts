import { runSaga } from "redux-saga";
import * as cinemaApi from "../api/cinemaApi";
import {
  initializeMoviesSaga,
  loadMovieSessionsDatesSaga,
  loadSelectedSessionsSaga,
  loadSelectedSessionTimeSaga,
  sendBookingDataSaga,
} from "./cinemaSaga";
import {
  setMovies,
  setErrorMessage,
  setMovieSessionsDates,
  setSelectedSessions,
  setSelectedSessionTime,
  setPaymentStatus,
} from "./cinemaSlice";
import type { Movie } from "../interfaces/movies.interface";
import type {
  Session,
  DetailedSession,
} from "../interfaces/sessions.interface";
import type {
  BookingData,
  SavedBookingData,
} from "../interfaces/booking.interface";

const mockMovies: Movie[] = [
  {
    _id: "movie-1",
    title: "Test Movie 1",
    description: "This is a test movie description for the first movie.",
    posterUrl: "https://example.com/poster1.jpg",
    duration: 120,
    genres: ["Action", "Adventure"],
    releaseDate: new Date("2025-12-25"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "movie-2",
    title: "Test Movie 2",
    description: "This is a test movie description for the second movie",
    posterUrl: "https://example.com/poster2.jpg",
    duration: 95,
    genres: ["Comedy", "Drama"],
    releaseDate: new Date("2026-01-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

describe("cinemaSaga", () => {
  const fetchMoviesMock = jest.spyOn(cinemaApi, "fetchMovies");
  const fetchSessionsDatesByMovieIdMock = jest.spyOn(
    cinemaApi,
    "fetchSessionsDatesByMovieId",
  );
  const fetchSessionsByDateForMovieMock = jest.spyOn(
    cinemaApi,
    "fetchSessionsByDateForMovie",
  );
  const fetchSessionByIdMock = jest.spyOn(cinemaApi, "fetchSessionById");
  const postBookingDataMock = jest.spyOn(cinemaApi, "postBookingData");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializeMoviesSaga successfully loads and sets movies", async () => {
    fetchMoviesMock.mockResolvedValue(mockMovies);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeMoviesSaga,
    ).toPromise();

    expect(fetchMoviesMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(setMovies(mockMovies));
  });

  test("initializeMoviesSaga handles errors", async () => {
    fetchMoviesMock.mockRejectedValue(new Error("Failed to fetch movies"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeMoviesSaga,
    ).toPromise();

    expect(fetchMoviesMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(
      setErrorMessage("Failed to load movies. Please try again later."),
    );
  });

  test("loadMovieSessionsDatesSaga successfully loads and sets session dates", async () => {
    const mockDates = ["2026-01-10", "2026-01-11", "2026-01-12"];
    const movieId = "movie-1";

    fetchSessionsDatesByMovieIdMock.mockResolvedValue(mockDates);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadMovieSessionsDatesSaga,
      { type: "cinema/loadMovieSessionsDates", payload: movieId },
    ).toPromise();

    expect(fetchSessionsDatesByMovieIdMock).toHaveBeenCalledWith(movieId);
    expect(dispatched).toContainEqual(setMovieSessionsDates(mockDates));
  });

  test("loadMovieSessionsDatesSaga handles errors", async () => {
    fetchSessionsDatesByMovieIdMock.mockRejectedValue(
      new Error("Failed to fetch dates"),
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadMovieSessionsDatesSaga,
      { type: "cinema/loadMovieSessionsDates", payload: "movie-1" },
    ).toPromise();

    expect(fetchSessionsDatesByMovieIdMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(
      setErrorMessage("Failed to load sessions list. Please try again later."),
    );
  });

  test("loadSelectedSessionsSaga successfully loads and sets selected sessions", async () => {
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

    const payload = { movieId: "movie-1", date: "2026-01-10" };

    fetchSessionsByDateForMovieMock.mockResolvedValue(mockSessions);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSelectedSessionsSaga,
      { type: "cinema/loadSelectedSessions", payload },
    ).toPromise();

    expect(fetchSessionsByDateForMovieMock).toHaveBeenCalledWith(
      "movie-1",
      "2026-01-10",
    );
    expect(dispatched).toContainEqual(setSelectedSessions(mockSessions));
  });

  test("loadSelectedSessionsSaga handles errors", async () => {
    fetchSessionsByDateForMovieMock.mockRejectedValue(
      new Error("Failed to fetch sessions"),
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSelectedSessionsSaga,
      {
        type: "cinema/loadSelectedSessions",
        payload: { movieId: "movie-1", date: "2026-01-10" },
      },
    ).toPromise();

    expect(dispatched).toContainEqual(
      setErrorMessage("Failed to load sessions. Please try again later."),
    );
  });

  test("loadSelectedSessionTimeSaga successfully loads and sets selected session time", async () => {
    const mockSessionDetails: DetailedSession = {
      _id: "session-1",
      date: "2026-01-10",
      startTime: "14:00",
      movieId: {
        _id: "movie-1",
        title: "Test Movie",
      },
      seats: [
        [
          { row: 1, number: 1, isBooked: false },
          { row: 1, number: 2, isBooked: false },
        ],
      ],
      price: 10,
    };

    fetchSessionByIdMock.mockResolvedValue(mockSessionDetails);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSelectedSessionTimeSaga,
      { type: "cinema/loadSelectedSessionTime", payload: "session-1" },
    ).toPromise();

    expect(fetchSessionByIdMock).toHaveBeenCalledWith("session-1");
    expect(dispatched).toContainEqual(
      setSelectedSessionTime(mockSessionDetails),
    );
  });

  test("loadSelectedSessionTimeSaga handles errors", async () => {
    fetchSessionByIdMock.mockRejectedValue(
      new Error("Failed to fetch session details"),
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSelectedSessionTimeSaga,
      { type: "cinema/loadSelectedSessionTime", payload: "session-1" },
    ).toPromise();

    expect(dispatched).toContainEqual(
      setErrorMessage("Failed to load session. Please try again later."),
    );
  });

  test("sendBookingDataSaga successfully sends booking data and sets payment status", async () => {
    const mockResponse: SavedBookingData = {
      ...mockBookingData,
      _id: "booking-1",
      createdAt: "2026-01-10T12:00:00Z",
      updatedAt: "2026-01-10T12:00:00Z",
    };

    postBookingDataMock.mockResolvedValue(mockResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      sendBookingDataSaga,
      { type: "cinema/sendBookingData", payload: mockBookingData },
    ).toPromise();

    expect(postBookingDataMock).toHaveBeenCalledWith(mockBookingData);
    expect(dispatched).toContainEqual(setPaymentStatus("processing"));
    expect(dispatched).toContainEqual(setPaymentStatus("successful"));
  });

  test("sendBookingDataSaga handles errors and sets payment status to failed", async () => {
    postBookingDataMock.mockRejectedValue(new Error("Booking failed"));

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      sendBookingDataSaga,
      { type: "cinema/sendBookingData", payload: mockBookingData },
    ).toPromise();

    expect(dispatched).toContainEqual(setPaymentStatus("processing"));
    expect(dispatched).toContainEqual(setPaymentStatus("failed"));
    expect(dispatched).toContainEqual(
      setErrorMessage("Failed to send booking data. Please try again later."),
    );
  });

  test("sendBookingDataSaga handles failed booking when response has no _id", async () => {
    postBookingDataMock.mockResolvedValue({} as SavedBookingData);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      sendBookingDataSaga,
      { type: "cinema/sendBookingData", payload: mockBookingData },
    ).toPromise();

    expect(dispatched).toContainEqual(setPaymentStatus("processing"));
    expect(dispatched).toContainEqual(setPaymentStatus("failed"));
  });
});
