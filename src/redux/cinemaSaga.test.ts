import { runSaga } from "redux-saga";
import * as cinemaApi from "../api/cinemaApi";

import {
  bookSeatsSaga,
  initializeScheduleSaga,
  loadSessionDetailsSaga,
  processPaymentSaga,
} from "./cinemaSaga";

import {
  bookSeatsSuccess,
  processPaymentSuccess,
  setErrorState,
  setSchedule,
  setSessionDetails,
} from "./cinemaSlice";

import type {
  BookedTicket,
  PaymentFormData,
  SessionsListResponse,
} from "../types";

describe("cinemaSaga", () => {
  const fetchSessionsListMock = jest.spyOn(cinemaApi, "fetchSessionsList");
  const fetchSessionDetailsMock = jest.spyOn(cinemaApi, "fetchSessionDetails");
  const postPaymentMock = jest.spyOn(cinemaApi, "postPayment");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializeScheduleSaga - successfully loads and sets schedule", async () => {
    const mockResponse: SessionsListResponse = {
      sessionsList: [
        {
          date: "2026-01-10",
          sessions: [
            {
              id: "session-1",
              time: "10:00",
            },
            { id: "session-2", time: "12:00" },
          ],
        },
      ],
    };

    fetchSessionsListMock.mockResolvedValue(mockResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeScheduleSaga
    ).toPromise();

    expect(dispatched).toContainEqual(setSchedule(mockResponse.sessionsList));
  });

  test("initializeScheduleSaga - handles errors", async () => {
    fetchSessionsListMock.mockRejectedValue(
      new Error("Failed to fetch sessions list")
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initializeScheduleSaga
    ).toPromise();

    expect(dispatched).toContainEqual(
      setErrorState("Error loading sessions list")
    );
  });

  test("loadSessionDetailsSaga - successfully loads and sets session details", async () => {
    const mockSessionDetails = {
      sessionId: "session-1",
      date: "2026-01-10",
      time: "10:00",
      totalSeats: 20,
      bookedSeats: 5,
      availableSeats: 15,
      seats: [
        [
          { row: 1, number: 1, isBooked: false },
          { row: 1, number: 2, isBooked: false },
        ],
      ],
    };

    fetchSessionDetailsMock.mockResolvedValue(mockSessionDetails);

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSessionDetailsSaga
    ).toPromise();

    expect(dispatched).toContainEqual(setSessionDetails(mockSessionDetails));
  });

  test("loadSessionDetailsSaga - handles errors", async () => {
    fetchSessionDetailsMock.mockRejectedValue(
      new Error("Failed to fetch session details")
    );

    const dispatched: unknown[] = [];

    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      loadSessionDetailsSaga
    ).toPromise();

    expect(dispatched).toContainEqual(
      setErrorState("Error loading session details")
    );
  });

  test("bookSeatsSaga - successfully books seats", async () => {
    const selectedSeats = [
      { row: 1, number: 2 },
      { row: 2, number: 3 },
    ];

    const mockState = {
      cinema: {
        selectedSessionId: "session-1",
        selectedDate: "2026-01-10",
      },
    };

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      bookSeatsSaga,
      { type: "cinema/bookSeats", payload: selectedSeats }
    ).toPromise();

    expect(dispatched).toContainEqual(
      bookSeatsSuccess({
        sessionId: "session-1",
        date: "2026-01-10",
        seats: selectedSeats,
      })
    );
  });

  test("bookSeatsSaga - does not book seats when no session is selected", async () => {
    const selectedSeats = [
      { row: 1, number: 2 },
      { row: 2, number: 3 },
    ];

    const mockState = {
      cinema: {
        selectedSessionId: null,
        selectedDate: "2026-01-10",
      },
    };

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      bookSeatsSaga,
      { type: "cinema/bookSeats", payload: selectedSeats }
    ).toPromise();

    expect(dispatched).not.toContainEqual(bookSeatsSuccess(expect.anything()));
  });

  test("bookSeatsSaga - handles errors", async () => {
    const selectedSeats = [
      { row: 1, number: 2 },
      { row: 2, number: 3 },
    ];

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => {
          throw new Error("State error");
        },
      },
      bookSeatsSaga,
      { type: "cinema/bookSeats", payload: selectedSeats }
    ).toPromise();

    expect(dispatched).toContainEqual(setErrorState("Error booking seats"));
  });

  test("processPaymentSaga - successfully processes payment", async () => {
    const mockPaymentData: PaymentFormData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      cardNumber: "4532 0151 1283 0366",
      expiryDate: "12/30",
      cvv: "123",
    };

    const mockBookedTicket: BookedTicket = {
      sessionId: "session-1",
      date: "2026-01-10",
      time: "10:00",
      seats: [{ row: 1, number: 1 }],
    };

    const mockState = {
      cinema: {
        bookedTicket: mockBookedTicket,
      },
    };

    const mockPaymentResponse = { success: true };
    postPaymentMock.mockResolvedValue(mockPaymentResponse);

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "cinema/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    expect(dispatched).toContainEqual(processPaymentSuccess());
  });

  test("processPaymentSaga - handles errors", async () => {
    const mockPaymentData: PaymentFormData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      cardNumber: "4532 0151 1283 0366",
      expiryDate: "12/30",
      cvv: "123",
    };

    const mockBookedTicket: BookedTicket = {
      sessionId: "session-1",
      date: "2026-01-10",
      time: "10:00",
      seats: [{ row: 1, number: 1 }],
    };

    const mockState = {
      cinema: {
        bookedTicket: mockBookedTicket,
      },
    };

    postPaymentMock.mockRejectedValue(new Error("Payment failed"));

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "cinema/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    expect(dispatched).toContainEqual(
      setErrorState("Error processing payment")
    );
  });
});
