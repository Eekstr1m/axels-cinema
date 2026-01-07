import cinemaReducer, {
  bookSeatsSuccess,
  clearSelectedSession,
  initializeSchedule,
  loadSessionDetails,
  processPayment,
  processPaymentSuccess,
  resetPaymentState,
  selectDate,
  selectSession,
  setErrorState,
  setSchedule,
  setSessionDetails,
} from "./cinemaSlice";

import type {
  BookedTicket,
  Booking,
  DaySchedule,
  PaymentFormData,
  SessionDetails,
} from "../types";

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

describe("cinemaSlice", () => {
  const initialState = {
    schedule: [],
    sessionDetails: null,
    selectedDate: "",
    selectedSessionId: null,
    isLoadingSchedule: false,
    isLoadingSession: false,
    bookedTicket: null,
    isProcessingPayment: false,
    isError: false,
  };

  test("should return the initial state", () => {
    expect(cinemaReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("initialize schedule sets loading state to true", () => {
    const state = cinemaReducer(initialState, initializeSchedule());
    expect(state.isLoadingSchedule).toBe(true);
  });

  test("setSchedule sets schedule and loading to false", () => {
    const mockSchedule: DaySchedule[] = [
      {
        date: "2026-01-10",
        sessions: [
          { id: "session-1", time: "14:00" },
          { id: "session-2", time: "16:00" },
        ],
      },
    ];
    const previousState = {
      ...initialState,
      isLoadingSchedule: true,
    };

    const state = cinemaReducer(previousState, setSchedule(mockSchedule));

    expect(state.schedule).toEqual(mockSchedule);
    expect(state.isLoadingSchedule).toBe(false);
    expect(state.isError).toBe(false);
  });

  test("selectDate sets the selected date", () => {
    const state = cinemaReducer(initialState, selectDate("2026-01-10"));
    expect(state.selectedDate).toBe("2026-01-10");
  });

  test("loadSessionsDetails sets loading state to true", () => {
    const state = cinemaReducer(initialState, loadSessionDetails());
    expect(state.isLoadingSession).toBe(true);
  });

  test("setSessionDetails sets session details and loading to false", () => {
    const previousState = {
      ...initialState,
      isLoadingSession: true,
    };

    const state = cinemaReducer(
      previousState,
      setSessionDetails(mockSessionDetails)
    );
    expect(state.sessionDetails).toEqual(mockSessionDetails);
    expect(state.isLoadingSession).toBe(false);
    expect(state.isError).toBe(false);
  });

  test("selectSession sets the selected session id", () => {
    const state = cinemaReducer(initialState, selectSession("session-1"));
    expect(state.selectedSessionId).toBe("session-1");
  });

  test("clearSelectedSession clears selected session id", () => {
    const previousState = {
      ...initialState,
      selectedSessionId: "session-1",
    };
    const state = cinemaReducer(previousState, clearSelectedSession());
    expect(state.selectedSessionId).toBeNull();
  });

  test("bookSeatsSuccess updates booking seats and booking info", () => {
    const previousState = {
      ...initialState,
      sessionDetails: mockSessionDetails,
      selectedSessionId: "session-1",
    };

    const mockBooking: Booking = {
      sessionId: "session-1",
      date: "2026-01-10",
      seats: [
        { row: 1, number: 2 },
        { row: 2, number: 3 },
      ],
    };
    const state = cinemaReducer(previousState, bookSeatsSuccess(mockBooking));

    expect(state.sessionDetails).not.toBeNull();
    expect(state.sessionDetails?.seats[0][1].isBooked).toBe(true); // row 1, number 2
    expect(state.sessionDetails?.seats[1][2].isBooked).toBe(true); // row 2, number 3

    expect(state.sessionDetails?.bookedSeats).toBe(4);
    expect(state.sessionDetails?.availableSeats).toBe(4);

    expect(state.bookedTicket).toEqual({
      sessionId: "session-1",
      date: "2026-01-10",
      time: "12:00",
      seats: [
        { row: 1, number: 2 },
        { row: 2, number: 3 },
      ],
    });

    expect(state.selectedSessionId).toBeNull();
  });

  test("bookSeatsSuccess does not update seats if sessionDetails is null", () => {
    const previousState = {
      ...initialState,
      sessionDetails: null,
      selectedSessionId: "session-1",
    };
    const mockBooking: Booking = {
      sessionId: "session-1",
      date: "2026-01-10",
      seats: [
        { row: 1, number: 2 },
        { row: 2, number: 3 },
      ],
    };
    const state = cinemaReducer(previousState, bookSeatsSuccess(mockBooking));

    expect(state.sessionDetails).toBeNull();
    expect(state.bookedTicket).toBeNull();
    expect(state.selectedSessionId).toBeNull();
  });

  test("processPayment sets processing state to true", () => {
    const mockPaymentData: PaymentFormData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      cardNumber: "4532 0151 1283 0366",
      expiryDate: "12/30",
      cvv: "123",
    };

    const state = cinemaReducer(initialState, processPayment(mockPaymentData));

    expect(state.isProcessingPayment).toBe(true);
    expect(state.isPaymentSuccessful).toBe(false);
  });

  test("processPaymentSuccess updates payment state", () => {
    const previousState = {
      ...initialState,
      isProcessingPayment: true,
      isPaymentSuccessful: false,
    };

    const state = cinemaReducer(previousState, processPaymentSuccess());

    expect(state.isProcessingPayment).toBe(false);
    expect(state.isPaymentSuccessful).toBe(true);
    expect(state.isError).toBe(false);
  });

  test("resetPaymentState clears payment and booking data", () => {
    const previousState = {
      ...initialState,
      isProcessingPayment: true,
      isPaymentSuccessful: true,
      bookedTicket: {
        sessionId: "session-1",
        date: "2026-01-10",
        time: "12:00",
        seats: [{ row: 1, number: 2 }],
      },
    };

    const state = cinemaReducer(previousState, resetPaymentState());

    expect(state.isProcessingPayment).toBe(false);
    expect(state.isPaymentSuccessful).toBe(false);
    expect(state.bookedTicket).toEqual({} as BookedTicket);
  });

  test("setError sets error state and message", () => {
    const errorMessage = "Failed to load schedule";
    const state = cinemaReducer(initialState, setErrorState(errorMessage));

    expect(state.isError).toBe(true);
    expect(state.errorMessage).toBe(errorMessage);
  });

  test("setError sets error state during schedule loading", () => {
    const previousState = {
      ...initialState,
      isLoadingSchedule: true,
    };
    const errorMessage = "Failed to load schedule";
    const state = cinemaReducer(previousState, setErrorState(errorMessage));

    expect(state.isError).toBe(true);
    expect(state.errorMessage).toBe(errorMessage);
    expect(state.isLoadingSchedule).toBe(false);
  });
});
