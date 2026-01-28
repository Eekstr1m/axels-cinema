import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from "../redux/cinemaSlice";
import { PaymentPage } from ".";

const emptyStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

const mockBookingSummary = {
  sessionId: "session-1",
  movieId: "movie-1",
  movieTitle: "Test Movie",
  date: "2025-12-25",
  time: "14:00",
  bookedSeats: [
    { row: 1, number: 1 },
    { row: 1, number: 2 },
  ],
  pricePerSeat: 10,
  totalPrice: 20,
};

const bookingStore = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
  preloadedState: {
    cinema: {
      movies: [],
      sessionsDates: [],
      selectedDate: "",
      selectedSessions: null,
      selectedSessionTime: null,
      bookingSummary: mockBookingSummary,
      bookingData: null,
      paymentStatus: "idle" as const,
      errorMessage: null,
    },
  },
});

describe(PaymentPage, () => {
  test("PaymentPage shows message when no booking found", () => {
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("No Tickets Selected")).toBeInTheDocument();
  });

  test("PaymentPage renders with booking data and display all sections", () => {
    render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>,
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
      </Provider>,
    );

    expect(screen.getByText("Movie:")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("2025-12-25")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("Seats:")).toBeInTheDocument();
    expect(screen.getByText("Row 1, Seat 1")).toBeInTheDocument();
    expect(screen.getByText("Row 1, Seat 2")).toBeInTheDocument();
    expect(screen.getByText("Total Price:")).toBeInTheDocument();
  });

  test("PaymentPage renders PaymentForm component", () => {
    render(
      <Provider store={bookingStore}>
        <BrowserRouter>
          <PaymentPage />
        </BrowserRouter>
      </Provider>,
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
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
