import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import scheduleReducer from "../redux/slices/scheduleSlice";
import bookingReducer from "../redux/slices/bookingSlice";
import paymentReducer from "../redux/slices/paymentSlice";
import { SessionsPage } from ".";

const mockStore = configureStore({
  reducer: {
    schedule: scheduleReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },
});

const scheduleStore = configureStore({
  reducer: {
    schedule: scheduleReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },
  preloadedState: {
    schedule: {
      schedule: [
        {
          date: "2026-01-10",
          sessions: [
            { id: "session-1", time: "14:00" },
            { id: "session-2", time: "18:00" },
          ],
        },
        {
          date: "2026-01-11",
          sessions: [{ id: "session-3", time: "20:00" }],
        },
      ],
      selectedDate: "2026-01-10",
      isLoading: false,
      error: null,
    },
    booking: {
      sessionDetails: null,
      selectedSessionId: null,
      bookedTicket: null,
      isLoadingSession: false,
      error: null,
    },
    payment: {
      isProcessing: false,
      isSuccessful: false,
      error: null,
    },
  },
});

describe(SessionsPage, () => {
  test("SessionsPage renders", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Axels Cinema Booking")).toBeInTheDocument();
  });

  test("SessionsPage show loading spinner when loading schedule", () => {
    const loadingStore = configureStore({
      reducer: {
        schedule: () => ({
          schedule: [],
          selectedDate: "",
          isLoading: true,
          error: null,
        }),
        booking: bookingReducer,
        payment: paymentReducer,
      },
    });

    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("SessionsPage renders DateSelector and SessionList when schedule loaded", () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    // Check DateSelector is rendered with formatted dates
    expect(screen.getByText("Sat, Jan 10")).toBeInTheDocument();
    expect(screen.getByText("Sun, Jan 11")).toBeInTheDocument();

    // Check SessionList is rendered with sessions
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
  });

  test("SessionsPage updates sessions when date is changed", async () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();

    const dateButton = screen.getByText("Sun, Jan 11");
    await user.click(dateButton);

    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.queryByText("14:00")).not.toBeInTheDocument();
  });

  test("SessionsPage open BookingModal when session is selected", async () => {
    render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("20:00")).toBeInTheDocument();
    expect(screen.queryByText("14:00")).not.toBeInTheDocument();

    const user = userEvent.setup();
    const sessionButton = screen.getByText("20:00");
    await user.click(sessionButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  test("SessionPage matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={scheduleStore}>
        <BrowserRouter>
          <SessionsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
