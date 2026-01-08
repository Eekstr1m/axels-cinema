import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { ErrorPage } from ".";

const createMockStore = (
  scheduleError: string | null = null,
  bookingError: string | null = null,
  paymentError: string | null = null
) => {
  return configureStore({
    reducer: {
      schedule: () => ({
        schedule: [],
        selectedDate: "",
        isLoading: false,
        error: scheduleError,
      }),
      booking: () => ({
        sessionDetails: null,
        selectedSessionId: null,
        bookedTicket: null,
        isLoadingSession: false,
        error: bookingError,
      }),
      payment: () => ({
        isProcessing: false,
        isSuccessful: false,
        error: paymentError,
      }),
    },
  });
};

describe(ErrorPage, () => {
  test("ErrorPage renders with default message when no errors in state", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("An unexpected error occurred. Please try again later.")
    ).toBeInTheDocument();
  });

  test("ErrorPage renders single error from schedule slice", () => {
    const store = createMockStore("Failed to load schedule");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Error Occurred")).toBeInTheDocument();
    expect(screen.getByText("Schedule:")).toBeInTheDocument();
    expect(screen.getByText("Failed to load schedule")).toBeInTheDocument();
  });

  test("ErrorPage renders single error from booking slice", () => {
    const store = createMockStore(null, "Some seats are already booked");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Error Occurred")).toBeInTheDocument();
    expect(screen.getByText("Booking:")).toBeInTheDocument();
    expect(
      screen.getByText("Some seats are already booked")
    ).toBeInTheDocument();
  });

  test("ErrorPage renders single error from payment slice", () => {
    const store = createMockStore(null, null, "Payment processing failed");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Error Occurred")).toBeInTheDocument();
    expect(screen.getByText("Payment:")).toBeInTheDocument();
    expect(screen.getByText("Payment processing failed")).toBeInTheDocument();
  });

  test("ErrorPage renders multiple errors from different slices", () => {
    const store = createMockStore(
      "Failed to load schedule",
      "Failed to book seats",
      "Payment failed"
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Errors Occurred")).toBeInTheDocument();
    expect(screen.getByText("Schedule:")).toBeInTheDocument();
    expect(screen.getByText("Failed to load schedule")).toBeInTheDocument();
    expect(screen.getByText("Booking:")).toBeInTheDocument();
    expect(screen.getByText("Failed to book seats")).toBeInTheDocument();
    expect(screen.getByText("Payment:")).toBeInTheDocument();
    expect(screen.getByText("Payment failed")).toBeInTheDocument();
  });

  test("ErrorPage renders multiple errors with correct pluralization", () => {
    const store = createMockStore("Error 1", "Error 2");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Errors Occurred")).toBeInTheDocument();
  });

  test("ErrorPage matches snapshot with no errors", () => {
    const store = createMockStore();

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("ErrorPage matches snapshot with multiple errors", () => {
    const store = createMockStore(
      "Schedule error",
      "Booking error",
      "Payment error"
    );

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
