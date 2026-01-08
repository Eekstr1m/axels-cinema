import bookingReducer, {
  loadSessionDetails,
  setSessionDetails,
  selectSession,
  clearSelectedSession,
  bookSeats,
  setBookedTicket,
  updateSessionSeats,
  clearBooking,
  setBookingError,
} from "./bookingSlice";

import type { SessionDetails, BookedTicket } from "../../types";

const mockSessionDetails: SessionDetails = {
  sessionId: "session-1",
  date: "2026-01-10",
  time: "12:00",
  totalSeats: 8,
  bookedSeats: 2,
  availableSeats: 6,
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
};

describe("bookingSlice", () => {
  const initialState = {
    sessionDetails: null,
    selectedSessionId: null,
    bookedTicket: null,
    isLoadingSession: false,
    error: null,
  };

  test("should return the initial state", () => {
    expect(bookingReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("loadSessionDetails sets loading state to true and clears error", () => {
    const previousState = {
      ...initialState,
      error: "Previous error",
    };

    const state = bookingReducer(
      previousState,
      loadSessionDetails("session-1")
    );

    expect(state.isLoadingSession).toBe(true);
    expect(state.error).toBeNull();
  });

  test("setSessionDetails sets session data and loading to false", () => {
    const previousState = {
      ...initialState,
      isLoadingSession: true,
    };

    const state = bookingReducer(
      previousState,
      setSessionDetails(mockSessionDetails)
    );

    expect(state.sessionDetails).toEqual(mockSessionDetails);
    expect(state.isLoadingSession).toBe(false);
    expect(state.error).toBeNull();
  });

  test("selectSession sets the selected session id", () => {
    const state = bookingReducer(initialState, selectSession("session-2"));
    expect(state.selectedSessionId).toBe("session-2");
  });

  test("clearSelectedSession clears selected session id", () => {
    const previousState = {
      ...initialState,
      selectedSessionId: "session-1",
    };

    const state = bookingReducer(previousState, clearSelectedSession());
    expect(state.selectedSessionId).toBeNull();
  });

  test("bookSeats does not modify state (handled in saga)", () => {
    const state = bookingReducer(
      initialState,
      bookSeats([
        { row: 1, number: 1 },
        { row: 2, number: 2 },
      ])
    );

    expect(state).toEqual(initialState);
  });

  test("setBookedTicket sets booked ticket and clears selected session", () => {
    const previousState = {
      ...initialState,
      selectedSessionId: "session-1",
    };

    const bookedTicket: BookedTicket = {
      sessionId: "session-1",
      date: "2026-01-10",
      time: "12:00",
      seats: [
        { row: 1, number: 1 },
        { row: 2, number: 3 },
      ],
    };

    const state = bookingReducer(previousState, setBookedTicket(bookedTicket));

    expect(state.bookedTicket).toEqual(bookedTicket);
    expect(state.selectedSessionId).toBeNull();
  });

  test("updateSessionSeats updates session details", () => {
    const previousState = {
      ...initialState,
      sessionDetails: mockSessionDetails,
    };

    const updatedSessionDetails: SessionDetails = {
      ...mockSessionDetails,
      bookedSeats: 4,
      availableSeats: 4,
      seats: [
        [
          { row: 1, number: 1, isBooked: true },
          { row: 1, number: 2, isBooked: true },
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
    };

    const state = bookingReducer(
      previousState,
      updateSessionSeats(updatedSessionDetails)
    );

    expect(state.sessionDetails).toEqual(updatedSessionDetails);
    expect(state.sessionDetails?.bookedSeats).toBe(4);
    expect(state.sessionDetails?.availableSeats).toBe(4);
  });

  test("clearBooking clears booked ticket", () => {
    const previousState = {
      ...initialState,
      bookedTicket: {
        sessionId: "session-1",
        date: "2026-01-10",
        time: "12:00",
        seats: [{ row: 1, number: 1 }],
      },
    };

    const state = bookingReducer(previousState, clearBooking());
    expect(state.bookedTicket).toBeNull();
  });

  test("setBookingError sets error message and stops loading", () => {
    const previousState = {
      ...initialState,
      isLoadingSession: true,
    };

    const errorMessage = "Failed to load session details";
    const state = bookingReducer(previousState, setBookingError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isLoadingSession).toBe(false);
  });

  test("setBookingError works when not loading", () => {
    const errorMessage = "Some seats are already booked";
    const state = bookingReducer(initialState, setBookingError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isLoadingSession).toBe(false);
  });
});
