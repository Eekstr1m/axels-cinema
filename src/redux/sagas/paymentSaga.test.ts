import { runSaga } from "redux-saga";
import * as cinemaApi from "../../api/cinemaApi";
import { processPaymentSaga } from "./paymentSaga";
import { setPaymentSuccess, setPaymentError } from "../slices/paymentSlice";
import type { BookedTicket, PaymentFormData } from "../../types";

describe("paymentSaga", () => {
  const postPaymentMock = jest.spyOn(cinemaApi, "postPayment");

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

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
    seats: [
      { row: 1, number: 1 },
      { row: 1, number: 2 },
    ],
  };

  test("processPaymentSaga - successfully processes payment", async () => {
    const mockState = {
      booking: {
        bookedTicket: mockBookedTicket,
      },
    };

    const mockPaymentResponse = { success: true };
    postPaymentMock.mockResolvedValue(mockPaymentResponse);

    const dispatched: unknown[] = [];

    const sagaPromise = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    // Fast-forward timer for the simulated delay
    jest.advanceTimersByTime(1500);

    await sagaPromise;

    expect(postPaymentMock).toHaveBeenCalledTimes(1);
    expect(postPaymentMock).toHaveBeenCalledWith({
      ...mockPaymentData,
      bookedTicket: mockBookedTicket,
    });
    expect(dispatched).toContainEqual(setPaymentSuccess());
  });

  test("processPaymentSaga - handles missing booking", async () => {
    const mockState = {
      booking: {
        bookedTicket: null,
      },
    };

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    expect(postPaymentMock).not.toHaveBeenCalled();
    expect(dispatched).toContainEqual(setPaymentError("No booking found"));
  });

  test("processPaymentSaga - handles payment API failure", async () => {
    const mockState = {
      booking: {
        bookedTicket: mockBookedTicket,
      },
    };

    const mockPaymentResponse = { success: false };
    postPaymentMock.mockResolvedValue(mockPaymentResponse);

    const dispatched: unknown[] = [];

    const sagaPromise = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    jest.advanceTimersByTime(1500);

    await sagaPromise;

    expect(postPaymentMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(setPaymentError("Payment failed"));
  });

  test("processPaymentSaga - handles network errors", async () => {
    const mockState = {
      booking: {
        bookedTicket: mockBookedTicket,
      },
    };

    postPaymentMock.mockRejectedValue(new Error("Network error"));

    const dispatched: unknown[] = [];

    const sagaPromise = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    jest.advanceTimersByTime(1500);

    await sagaPromise;

    expect(postPaymentMock).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(
      setPaymentError("Failed to process payment")
    );
  });

  test("processPaymentSaga - handles timeout errors", async () => {
    const mockState = {
      booking: {
        bookedTicket: mockBookedTicket,
      },
    };

    postPaymentMock.mockRejectedValue(new Error("Request timeout"));

    const dispatched: unknown[] = [];

    const sagaPromise = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    jest.advanceTimersByTime(1500);

    await sagaPromise;

    expect(dispatched).toContainEqual(
      setPaymentError("Failed to process payment")
    );
  });

  test("processPaymentSaga - sends correct payment info structure", async () => {
    const mockState = {
      booking: {
        bookedTicket: mockBookedTicket,
      },
    };

    const mockPaymentResponse = { success: true };
    postPaymentMock.mockResolvedValue(mockPaymentResponse);

    const dispatched: unknown[] = [];

    const sagaPromise = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => mockState,
      },
      processPaymentSaga,
      {
        type: "payment/processPayment",
        payload: mockPaymentData,
      }
    ).toPromise();

    jest.advanceTimersByTime(1500);

    await sagaPromise;

    const expectedPaymentInfo = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      cardNumber: "4532 0151 1283 0366",
      expiryDate: "12/30",
      cvv: "123",
      bookedTicket: mockBookedTicket,
    };

    expect(postPaymentMock).toHaveBeenCalledWith(expectedPaymentInfo);
  });
});
