import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "../redux/slices/scheduleSlice";
import bookingReducer from "../redux/slices/bookingSlice";
import paymentReducer from "../redux/slices/paymentSlice";
import { PaymentPage } from ".";

const emptyStore = configureStore({
  reducer: {
    schedule: scheduleReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },
});

const bookingStore = configureStore({
  reducer: {
    schedule: scheduleReducer,
    booking: () => ({
      sessionDetails: null,
      selectedSessionId: null,
      bookedTicket: {
        sessionId: "session-1",
        date: "2026-01-05",
        time: "14:00",
        seats: [
          { row: 1, number: 5 },
          { row: 1, number: 6 },
        ],
      },
      isLoadingSession: false,
      error: null,
    }),
    payment: paymentReducer,
  },
});

describe(PaymentPage, () => {
  test("PaymentPage shows message when no booking found", () => {
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("No booking found. Please book tickets first.")
    ).toBeInTheDocument();
  });

  test("PaymentPage renders with booking data and display all sections", () => {
    render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Payment Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Booking Summary")).toBeInTheDocument();
  });

  test("PaymentPage displays booking details correctly", () => {
    render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Movie:")).toBeInTheDocument();
    expect(screen.getByText("session-1")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("2026-01-05")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("Seats:")).toBeInTheDocument();
    expect(screen.getByText("Row 1 Seat 5, Row 1 Seat 6")).toBeInTheDocument();
    expect(screen.getByText("Total Price:")).toBeInTheDocument();
  });

  test("PaymentPage renders PaymentForm component", () => {
    render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
  });

  test("PaymentPage matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
